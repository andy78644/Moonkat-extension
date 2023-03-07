require('dotenv').config()

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetchWithRetry = async (url, options, retries = 3, waitTime = 1000) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 429) {
      if (retries > 0) {
        console.log(`Got 429, retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        return fetchWithRetry(url, options, retries - 1, waitTime);
      } else {
        throw new Error("Max retries exceeded");
      }
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getAssetData = async (change, txn) => {
  if (txn.assetType === 'ERC20' || txn.assetType === 'NATIVE'){
    change.amount = Number(txn.amount).toFixed(4);
    change.tokenURL = txn.logo
    change.collectionName = txn.name
  }
  else{
    await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}\n
    /getNFTMetadata?contractAddress=${txn.contractAddress}&tokenId=${txn.tokenId}`)
    .then(response => 
      response.json()
    )
    .then(response => {
      console.log('getAssetData: ', response)
      if (response.error){
        change.tokenURL = response.contractMetadata.openSea.imageUrl
      }
      else{
        change.tokenURL = response.media[0].gateway
      }
      change.title = response.title
      change.collectionName = response.contractMetadata.openSea.collectionName
      change.osVerified = response.contractMetadata.openSea.safelistRequestStatus
      change.amount = txn.amount
      change.tokenId = txn.tokenId
    })
    .catch(err => {
      console.log(err.message) 
      return 'Alchemy Error'    
    })
  }
}

const approvalHandler = (txn) => {
  let assetApprove = {
    symbol:"",
    contractAddress:"",
    amount:"",
    tokenURL:"",
    collectionName:"",
  }
  assetApprove.symbol = txn.symbol
  assetApprove.contractAddress = txn.to
  assetApprove.amount = txn.amount
  assetApprove.tokenURL = txn.logo
  assetApprove.collectionName = txn.name
  return assetApprove
}

const transferHandler = async (txn) => {
  let asset = {
    amount:"",
    type:"",
    symbol:"",
    tokenURL:"",
    collectionName:"",
    title:"",
    osVerified:"",
    tokenId:null,
  }
  asset.type = txn.assetType
  asset.symbol = txn.symbol
  let err = await getAssetData(asset, txn)
  if (err) return err
  return asset
}

exports.sendTransaction = async (req, res) => {
    const from = req.body.from
    let transactionInfo = {
      changeType:"",
      gas: "",
      in:[],
      out:[],
      approve:null
    };
    
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        body: JSON.stringify({
          id: 1,
          jsonrpc: '2.0',
          method: 'alchemy_simulateAssetChanges',
          params: [
            req.body
          ]
        })
    };
    const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
    try {
      await fetchWithRetry(url, options)
      .then((response)=>
        response.json())
        .then(async response => {
          await sleep(500)
          console.log('Simulation Response: ', response)
          if(response.error){
            res.status(500).send({
              message:response.error.message
            })
            return
          }
          const result = response.result
          transactionInfo.gas = result.gasUsed
          let _ = new Promise (async (resolve, reject)=>{
            for ( let changeObj of result.changes){
              if(changeObj.from === from){
                if (changeObj.changeType === 'APPROVE'){
                  assetApprove = approvalHandler(changeObj)
                  transactionInfo.changeType = 'APPROVE'
                  transactionInfo.approve = assetApprove
                  console.log('Approve: ', transactionInfo)
                  resolve()
                }
                else if (changeObj.changeType === 'TRANSFER'){
                  transactionInfo.changeType = 'TRANSFER'
                  let outObj = await transferHandler(changeObj)
                  .catch((err)=>{
                    res.status(500).send(err)
                    reject()
                  })
                  transactionInfo.out.push(outObj)
                }
              }
              else if(changeObj.to === from){
                if (changeObj.changeType === 'TRANSFER'){
                  transactionInfo.changeType = 'TRANSFER'
                  let inObj = await transferHandler(changeObj)
                  .catch((err)=>{
                    res.status(500).send(err)
                    reject()
                  })
                  transactionInfo.in.push(inObj)
                }
              }
          } 
          console.log(transactionInfo)
          res.status(200).send(transactionInfo)
          resolve()
          })
      })
    } catch (error) {  
      res.status(500).send({
          message:
          error.message
        }); 
    }
}