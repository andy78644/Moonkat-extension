// For test use
const fs = require('fs')

// read JSON object from file
fs.readFile('../../txnres.json', 'utf-8', (err, data) => {
    if (err) {
      throw err
    }
    // parse JSON object
    const result = JSON.parse(data.toString())
    const userAddress = result.transactions[0].from
    const neededGas = result.gasUsed[0]
    console.log(`Use ${neededGas} Gas`)
    console.log(`Out ${result.transactions[0].value} GWei`)
    const contractAddress = result.transactions[0].to
    console.log(`From: ${userAddress}, To: ${contractAddress}`)
    console.log(result)
    console.log(result.internalTransactions[0])
    console.log(result.netBalanceChanges[0])
    let txnData = {}
    for(let change in result.netBalanceChanges[0]){
        let c = result.netBalanceChanges[0][change]
        if(c.address === userAddress){
            console.log('Change: ', c)
            console.log('Asset: ', c.balanceChanges[0].asset)
            txnData.in = c.balanceChanges[0].asset
            console.log('breakdown: ', c.balanceChanges[0].breakdown)
            txnData.in.number = c.balanceChanges[0].breakdown[0].amount
            console.log('--------------')

          }
          else{
            console.log('Change: ', c)
            console.log('Asset: ', c.balanceChanges[0].asset)
            console.log('breakdown: ', c.balanceChanges[0].breakdown)
            console.log('--------------')
          }
    }
    txnData.out = result.transactions[0].value
    txnData.gas = result.gasUsed[0]
    console.log(txnData)
    // print JSON object
    // console.log(user)
  })