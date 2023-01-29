// For test use
const fs = require('fs')

// read JSON object from file
fs.readFile('../../txnres.json', 'utf-8', (err, data) => {
    if (err) {
      throw err
    }
    console.log(data)
    const result = JSON.parse(data.toString())
    const userAddress = result.transactions[0].from
    const contractAddress = result.transactions[0].to
    console.log(`From: ${userAddress}, To: ${contractAddress}`)
    console.log(result)
    console.log(result.internalTransactions)
    console.log(result.netBalanceChanges)
    let txnData = {}
    for( change of result.netBalanceChanges[0]){
        let c = change 
        console.log('Change: ', c)
        console.log('Asset: ', c.balanceChanges[0].asset)
        console.log('breakdown: ', c.balanceChanges[0].breakdown)
        console.log('--------------')
        if(c.address === userAddress){
            txnData.in = c.balanceChanges[0].asset
            txnData.in.number = c.balanceChanges[0].breakdown[0].amount
          }
    }
    txnData.out = result.transactions[0].value
    txnData.gas = result.gasUsed[0]
    console.log(txnData)
  })