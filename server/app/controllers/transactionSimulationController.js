// This is the Node client for sending the transaction which is waited to be simulated
const net = require("net");
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');
// For test use
const fs = require('fs')

// The .env require no compile, but it needs to be at the same folder 
require('dotenv').config()

// create options object
const options = {
    dappId: process.env.BLOCK_NATIVE_AUTH,
    networkId: 1,
    transactionHandlers: [event => console.log(event.transaction)],
    ws: WebSocket, // only neccessary in server environments 
    onerror: (error) => {console.log(error)} //optional, use to catch errors
}

// initialize and connect to the api
const blocknative = new BlocknativeSdk(options)

exports.sendBlockNativeTransaction = async (req, res) => {
    console.log('BlockNative Data: ', req.body)
    const transactionsToSim = [req.body]

    await blocknative.multiSim(transactionsToSim)
    .then((result) => {
        console.log('Simulation Success! Result: ', result)
        const data = JSON.stringify(result)
        // write JSON string to a file
        fs.writeFile('txnres.json', data, err => {
        if (err) {
            throw err
        }
        console.log('JSON data is saved.')
        })
        res.send(result)
    })
    .catch(err => {
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
