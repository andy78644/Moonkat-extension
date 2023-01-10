// This is the Node client for sending the transaction which is waited to be simulated
const net = require("net");

exports.sendTransaction = async (req, res) =>{
    // process data
    // send to hre server
    // node_client.on
    _data = await req.body
    console.log('Send Transaction Async Request Body Data: ', _data)

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
// Data Spec
// {
//     "to":,
//     "value":
//     "data"
// }