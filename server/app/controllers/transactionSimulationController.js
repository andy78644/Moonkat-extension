// This is the Node client for sending the transaction which is waited to be simulated
const net = require("net");
const BlocknativeSdk = require('bnc-sdk');
const WebSocket = require('ws');
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
    const transactionsToSim = [
        {   
            "gas": 191332,
            "value": 1100000000000000,
            "from": "0xd809b476c56877d7a799d618d96479df0a5d965c",
            "to": "0x00000000006c3852cbef3e08e8df289169ede581",
            "gasPrice": 17525540379,
            "input": "0xfb0f3ee100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000039d692e0f180000000000000000000000000057e766997ed89ec496fdf3fa315d12bc2ae87e63000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c0000000000000000000000000022b446ac53d52f52f3ed3f308b53cf048bef70790000000000000000000000000000000000000000000000000000000000000411000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000063b64ddb0000000000000000000000000000000000000000000000000000000063df2c5b0000000000000000000000000000000000000000000000000000000000000000360c6ebe00000000000000000000000000000000000000009feffb13239c60410000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002e0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000001902d7bb38000000000000000000000000000000a26b00c1f0df003000390027140000faa71900000000000000000000000000000000000000000000000000003205af767000000000000000000000000000803a76eb776fb8ec02082f11a1ce8eb0c79436f70000000000000000000000000000000000000000000000000000000000000041f6105f3a4c49faa9224ca537081d3c49e120c8d235328757ca8c0355da99a27524fc700e51a7e05d7dc556a73459b697e71751538c43a47a54506dcb79ad62481b0000000000000000000000000000000000000000000000000000000000000000000000360c6ebe"
        }
    ]
    const result = await blocknative.multiSim(transactionsToSim)
    console.log('Res: ', result)
}
exports.sendTransaction = async (req, res) =>{
    console.log('Send Transaction Async Request Body Data: ', req.body)

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

// BN Data Spec
// {
//     "system":"ethereum",
//     "network":"main",
//     "transactions":[{
//     "gas": ,
//     "value": ,
//     "from": "",
//     "to": "",
//     "gasPrice": ,
//     "input": "0x.."
//         }]
// }