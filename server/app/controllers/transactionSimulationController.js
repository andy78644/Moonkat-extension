// This is the Node client for sending the transaction which is waited to be simulated
const net = require("net");
// For test use
const fs = require('fs')

// The .env require no compile, but it needs to be at the same folder 
require('dotenv').config()
  

exports.sendBlockNativeTransaction = async (req, res) => {
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
    .then(response => {
        console.log('Simulation Success! Result: ', response)
        // write JSON string to a file
        const data = JSON.stringify(response.result)
        fs.writeFile('txnres.json', data, err => {
        if (err) {
            throw err
        }
        console.log('JSON data is saved.')
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


exports.sendTransaction = async (req, res) =>{
    console.log('HardHat Data: ', req.body)

    // Create a socket (client) that connects to the server
    var socket = new net.Socket();
    socket.connect(31337, "localhost", function () {
        console.log("Client: Connected to HRE server");
    });
    // Send Data
    socket.write(JSON.stringify(req.body)); 
    // Let's handle the data we get from the server
    socket.on("data", function (data) {
        data = JSON.parse(data);
        console.log("Response Data from server: %s", data.response);
        // // Close the connection
        // socket.end();
    });
}
// HRE Data Spec
// {
//     "to":,
//     "value":
//     "data"
// }
