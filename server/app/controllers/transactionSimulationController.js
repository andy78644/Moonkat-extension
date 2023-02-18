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
    })
    .catch(err => {
      console.log(err.message) 
      return 'Alchemy Error'    
    })
  }
}

const approvalHandler = (txn) => {
  let assetApprove = {
    token:"",
    contractAddress:"",
    amount:"",
    tokenURL:"",
    name:"",
  }
  assetApprove.token = txn.symbol
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
      gas: "",
      approve:"",
      in:"",
      out:""
    };
    let assetOut = {
      amount:"",
      type:"",
      symbol:"",
      tokenURL:"",
      osVerified:"",
    }
    let assetIn = {
      amount:"",
      type:"",
      symbol:"",
      tokenURL:"",
      osVerified:"",
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
    .then(response => 
        response.json()
    )
    .then(async response => {
        console.log('Simulation Success! Result: ', response)
        const result = response.result
        transactionInfo.gas = result.gasUsed
        for ( let changeObj of result.changes){
            if(changeObj.from === from){
              if (changeObj.changeType === 'APPROVE'){
                assetApprove = approvalHandler(changeObj)
                transactionInfo.approve = assetApprove
                console.log('Approve: ', transactionInfo)
                res.status(200).send(transactionInfo)
              }
              else if (changeObj.changeType === 'TRANSFER'){
                assetOut = await transferHandler(assetOut, changeObj)
              }
            }
            else if(changeObj.to === from){
              if (changeObj.changeType === 'TRANSFER'){
                assetIn = await transferHandler(assetIn, changeObj)
              }
            }
        }
        console.log('In: ', assetIn)
        console.log('Out: ', assetOut)
        transactionInfo.in = assetIn
        transactionInfo.out = assetOut 
        res.status(200).send(transactionInfo)
    })
    .catch(err => {
        console.log(err.message)  
        res.status(500).send({
            message:
              err.message || "error"
          });           
    })
}