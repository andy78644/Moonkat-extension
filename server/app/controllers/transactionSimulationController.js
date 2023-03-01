require('dotenv').config()

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getAssetData = async (change, txn) => {
  if (txn.assetType === 'ERC20' || txn.assetType === 'NATIVE'){
    change.amount = Number(txn.amount).toFixed(4);
    change.tokenURL = txn.logo
    change.name = txn.name
  }
  else{
    await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}\n
    /getNFTMetadata?contractAddress=${txn.contractAddress}&tokenId=${txn.tokenId}`)
    .then(response => 
      response.json()
    )
    .then(response => {
      if (response.error){
        change.tokenURL = response.contractMetadata.openSea.imageUrl
      }
      else{
        change.tokenURL = response.media[0].gateway
      }
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
    name:"",
  }
  assetApprove.symbol = txn.symbol
  assetApprove.contractAddress = txn.contractAddress
  assetApprove.amount = txn.amount
  assetApprove.tokenURL = txn.logo
  assetApprove.name = txn.name
  return assetApprove
}

const transferHandler = async (txn) => {
  let asset = {
    amount:"",
    type:"",
    symbol:"",
    tokenURL:"",
    osVerified:"",
    tokenId:null,
    name:""
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

    await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`, options)
    .then((response) => 
        response.json()
    )
    .then(async response => {
        await sleep(3000)
        console.log('Simulation Response: ', response)
        if(response.error){
          res.status(500).send({
            message:response.error.message
          })
          return
        }
        const result = response.result
        transactionInfo.gas = result.gasUsed
        let r = new Promise (async (resolve, reject)=>{
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
    .catch(err => {
        console.log(err.message)  
        res.status(500).send({
            message:
              err.message || "error"
          });           
    })
}