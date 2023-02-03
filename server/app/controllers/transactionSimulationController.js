// This is the Node client for sending the transaction which is waited to be simulated
const net = require("net");
// The .env require no compile, but it needs to be at the same folder 
require('dotenv').config()
  

exports.sendTransaction = async (req, res) => {
    const from = req.body.from
    let assetChange = {
        out: "",
        outSymbol:"",
        in: "",
        inSymbol:"",
        gas: "",
        tokenURL:""
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
        for ( let changeObj of result.changes){
            console.log(changeObj)
            if(changeObj.from===from){
              assetChange.out = changeObj.amount
              assetChange.outSymbol = changeObj.symbol
            }
            if(changeObj.to===from){
              if(changeObj.assetType === 'ERC1155' || changeObj.assetType === 'ERC721'){
                await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}\n
                /getNFTMetadata?contractAddress=${changeObj.contractAddress}&tokenId=${changeObj.tokenId}`)
                .then(response => 
                  response.json()
                )
                .then(response => {
                  console.log(response)
                  assetChange.tokenURL = response.metadata.image_url
                })
                .catch(err => {
                  console.log(err.message)  
                  res.status(500).send({
                      message:
                        err.message || "error"
                    });           
              })
              }
              else if(changeObj.assetType === 'ERC20'){
                assetChange.tokenURL = changeObj.logo
              }
              assetChange.in = changeObj.amount
              assetChange.inSymbol = changeObj.symbol
            }
          }
          assetChange.gas = result.gasUsed
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