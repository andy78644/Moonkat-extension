// For test use
const fs = require('fs')

// read JSON object from file
fs.readFile('../../txnres.json', 'utf-8', (err, data) => {
    if (err) {
      throw err
    }
    const result = JSON.parse(data.toString())
    const userAddress = result.transactions.from
    const contractAddress = result.transactions.to
    console.log(`From: ${userAddress}, To: ${contractAddress}`)
    console.log(result)
    console.log(result.internalTransactions)
    console.log(result.netBalanceChanges)
    let txnData = {}
    for(let change in result.netBalanceChanges){
        let c = result.netBalanceChanges[change]
        console.log('Change: ', c)
        console.log('Asset: ', c.balanceChanges[0].asset)
        console.log('breakdown: ', c.balanceChanges[0].breakdown)
        console.log('--------------')
        if(c.address === userAddress){
            txnData.in = c.balanceChanges[0].asset
            txnData.in.number = c.balanceChanges[0].breakdown[0].amount
          }
    }
    txnData.out = result.transactions.value
    txnData.gas = result.gasUsed
    console.log(txnData)
  })