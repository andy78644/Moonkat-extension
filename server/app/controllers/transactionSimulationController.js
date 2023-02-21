require('dotenv').config()

const getAssetData = async (change, txn) => {
  if (txn.assetType === 'ERC20' || txn.assetType === 'NATIVE'){
    change.amount = Number(txn.amount).toFixed(4);
    change.tokenURL = txn.logo
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

const transferHandler = async (move, txn) => {
  move.type = txn.assetType
  move.symbol = txn.symbol
  let err = await getAssetData(move, txn)
  if (err) return err
  return move
}

exports.sendTransaction = async (req, res) => {
    //todo: define the user address
    const from = req.body.from
    let transactionInfo = {
      changeType:"",
      gas: "",
      in:[],
      out:[],
      approve:null
    };
    let assetOut = {
      amount:"",
      type:"",
      symbol:"",
      tokenURL:"",
      osVerified:"",
      tokenId:null
    }
    let assetIn = {
      amount:"",
      type:"",
      symbol:"",
      tokenURL:"",
      osVerified:"",
      tokenId:null
    }
    
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
        console.log('Simulation Success!')
        const result = response.result
        transactionInfo.gas = result.gasUsed
        new Promise (async (resolve, reject)=>{
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
                assetOut = await transferHandler(assetOut, changeObj)
                .catch((err)=>{
                  res.status(500).send(err)
                  reject()
                })
                transactionInfo.out.push(assetOut)
              }
            }
            else if(changeObj.to === from){
              if (changeObj.changeType === 'TRANSFER'){
                transactionInfo.changeType = 'TRANSFER'
                assetIn = await transferHandler(assetIn, changeObj)
                .catch((err)=>{
                  res.status(500).send(err)
                  reject()
                })
                transactionInfo.in.push(assetIn)
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