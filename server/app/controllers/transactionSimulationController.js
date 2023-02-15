// This is the Node client for sending the transaction which is waited to be simulated
const net = require("net");
// The .env require no compile, but it needs to be at the same folder 
require('dotenv').config()
  

exports.sendTransaction = async (req, res) => {
    const from = req.body.from
    let assetChange = {
      out: "",
      outSymbol:""
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
    .then(response => 
        response.json()
    )
    .then(async response => {
        console.log('Simulation Success! Result: ', response)
        const result = response.result
        assetChange.gas = result.gasUsed
        for ( let changeObj of result.changes){
            if(changeObj.from === from){
              console.log('Asset Out: ', changeObj)
              assetChange.outTokenType = changeObj.assetType
              assetChange.outSymbol = changeObj.symbol
              if(changeObj.assetType === 'ERC20'){
                assetChange.out = Number(changeObj.amount).toFixed(4);
              }
              else{
                assetChange.out = changeObj.amount
              }
            }
            if(changeObj.to === from){
              console.log('Asset In: ', changeObj)
              assetChange.TokenType = changeObj.assetType
              assetChange.inSymbol = changeObj.name
              if (changeObj.assetType === 'ERC20'){
                assetChange.tokenURL = changeObj.logo
                assetChange.in = Number(changeObj.amount).toFixed(4);
              }
              else {
                await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}\n
                /getNFTMetadata?contractAddress=${changeObj.contractAddress}&tokenId=${changeObj.tokenId}`)
                .then(response => 
                  response.json()
                )
                .then(response => {
                  if (response.error){
                    assetChange.tokenURL = response.contractMetadata.openSea.imageUrl
                  }
                  else{
                    assetChange.tokenURL = response.media[0].gateway
                  }
                  assetChange.osVerified = response.contractMetadata.openSea.safelistRequestStatus
                  assetChange.in = changeObj.amount
                })
                .catch(err => {
                  console.log(err.message)  
                  res.status(500).send({
                      message:
                        err.message || "error"
                    });           
              })
              }
            }
          }
          console.log('Decoded: ', assetChange)
        res.status(200).send(assetChange)
    })
    .catch(err => {
        console.log(err.message)  
        res.status(500).send({
            message:
              err.message || "error"
          });           
    })
}