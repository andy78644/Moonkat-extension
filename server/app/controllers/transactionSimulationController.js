require('dotenv').config()
const Web3 = require('web3');
const web3 = new Web3();
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetchWithRetry = async (url, options, retries = 3, waitTime = 1000) => {
  try {
    const response = await fetch(url, options);
    if (response.status === 429) {
      if (retries > 0) {
        console.log(`Got 429, retrying in ${waitTime}ms...`);
        await sleep(waitTime);
        return fetchWithRetry(url, options, retries - 1, waitTime);
      } else {
        throw new Error("Max retries exceeded");
      }
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getAssetData = async (asset, txn) => {
  if (txn.assetType === 'ERC20' || txn.assetType === 'NATIVE') {
    asset.amount = Number(txn.amount).toFixed(4);
    asset.tokenURL = txn.logo
    asset.collectionName = txn.name
  }
  else {
    await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}\n
    /getNFTMetadata?contractAddress=${txn.contractAddress}&tokenId=${txn.tokenId}`)
      .then(response =>
        response.json()
      )
      .then(response => {
        asset.amount = txn.amount
        asset.tokenId = txn.tokenId

        console.log('getAssetData: ', response)
        if (response.error) asset.tokenURL = response.contractMetadata.openSea.imageUrl
        else asset.tokenURL = response.media[0].gateway
        // else -> NFT png 

        // response.metadata.name / response.title
        // If Null -> "NFT" ? :
        asset.title = response.title
        asset.collectionName = response.contractMetadata.name
        asset.symbol = response.contractMetadata.symbol
        // May be null
        // ?: rule 
        asset.collectionIconUrl = response.contractMetadata.openSea.imageUrl
        asset.osVerified = response.contractMetadata.openSea.safelistRequestStatus
      })
      .catch(err => {
        console.log(err.message)
        return 'fetching error'
      })
  }
}

const getApproveData = async (asset, txn) => {
  if (txn.assetType === 'ERC20' || txn.assetType === 'NATIVE') {
    asset.amount = Number(txn.amount).toFixed(4);
    asset.tokenURL = txn.logo
    asset.collectionName = txn.name
  }
  else {
    await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}\n
    /getContractMetadata?contractAddress=${txn.contractAddress}`)
      .then(response =>
        response.json()
      )
      .then(response => {
        console.log('getApproveData: ', response)
        // As Approve, we do not approve single NFT, so we assign the contractimageUrl as collectionUrl
        asset.collectionIconUrl = response.contractMetadata.openSea.imageUrl
        asset.symbol = response.contractMetadata.symbol
        asset.collectionName = response.contractMetadata.name
        // May be null
        // ?: rule 
        asset.osVerified = response.contractMetadata.openSea.safelistRequestStatus
      })
      .catch(err => {
        console.log(err.message)
        return 'fetching error'
      })
  }
}
const approvalHandler = async (txn) => {
  let assetApprove = {
    symbol: "",
    contractAddress: "",
    amount: "",
    tokenURL: "",
    collectionName: "",
    title: "",
    osVerified: ""
  }
  assetApprove.symbol = txn.symbol
  assetApprove.contractAddress = txn.to
  assetApprove.amount = txn.amount
  let err = await getApproveData(assetApprove, txn)
  if (err) return err
  else return assetApprove
}

const transferHandler = async (txn) => {
  let asset = {
    amount: "",
    type: "",
    symbol: "",
    tokenURL: "",
    collectionName: "",
    collectionIconUrl: "",
    title: "",
    osVerified: "",
    tokenId: null,
  }
  asset.type = txn.assetType
  asset.symbol = txn.symbol
  let err = await getAssetData(asset, txn)
  if (err) return err
  else return asset
}

exports.sendTransaction = async (req, res) => {
  const from = req.body.from
  let txn = req.body
  txn.gasPrice = '0x0'
  delete txn.maxFeePerGas
  delete txn.maxPriorityFeePerGas
  console.log('t: ', txn)
  let transactionInfo = {
    changeType: "",
    gas: "",
    in: [],
    out: [],
    approve: null
  };

  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'alchemy_simulateAssetChanges',
      params: [
        txn
      ]
    })
  };
  const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  try {
    await fetchWithRetry(url, options)
      .then((response) =>
        response.json())
      .then(async response => {
        console.log('Simulation Response: ', response)
        if (response.error) {
          res.status(500).send({
            message: response.error.message
          })
          return
        }
        const result = response.result
        transactionInfo.gas = result.gasUsed
        let errStat = false
        for (let changeObj of result.changes) {
          if (changeObj.from === from) {
            if (changeObj.changeType === 'APPROVE') {
              assetApprove = await approvalHandler(changeObj)
              transactionInfo.changeType = 'APPROVE'
              transactionInfo.approve = assetApprove
              console.log('Approve: ', transactionInfo)
            }
            else if (changeObj.changeType === 'TRANSFER') {
              transactionInfo.changeType = 'TRANSFER'
              await transferHandler(changeObj)
                .then((res) => {
                  transactionInfo.out.push(res)
                })
                .catch((err) => {
                  errStat = true
                })
            }
          }
          else if (changeObj.to === from) {
            if (changeObj.changeType === 'TRANSFER') {
              transactionInfo.changeType = 'TRANSFER'
              await transferHandler(changeObj)
                .then((res) => {
                  transactionInfo.in.push(res)
                })
                .catch((err) => {
                  errStat = true
                })
            }
          }
        }
        console.log('Transfer: ', transactionInfo)
        if (errStat) res.status(500).send({ message: "something wrong" })
        else if (transactionInfo.in.length === 0 && transactionInfo.out.length === 0 && !transactionInfo.approve) res.status(500).send({ message: "something wrong" })
        else res.status(200).send(transactionInfo)
      })
  } catch (error) {
    res.status(500).send({
      message:
        error.message
    });
  }
}

exports.signatureParsing = async (req, res) => {
  let transactionInfo = "";
  console.log(req.body)
  let payload = req.body.payload;
  //console.log(payload)
  const openseaContract = '0x00000000000001ad428e4906aE43D8F9852d0dD6'
  const blurContract = '0x000000000000ad05ccc4f10045630fb830b95127'
  if(req.body.type === 'eth_signTypedData_v4' && payload.domain.name === 'Seaport' && payload.domain.verifyingContract === openseaContract){ transactionInfo =  await openseaTransInfo(payload);}
  else if(req.body.type === 'eth_signTypedData_v4' && payload.domain.name === 'Blur Exchange' && payload.domain.verifyingContract === blurContract){ transactionInfo =  await blurTransInfo(payload);}
  //console.log(transactionInfo);payload.signatureVersion === '"signature-712' && 
  console.log("[transactionSimulationController.js] [openseaTransInfo]: transactionInfo is ", transactionInfo)
  res.status(200).send(transactionInfo);

}

async function openseaTransInfo(payload) {
  console.log("[transactionSimulationController.js] [openseaTransInfo]: payload.primaryType is ", payload.primaryType)
  if (payload.primaryType === 'OrderComponents') return await seaSingleList(payload);
  else if (payload.primaryType === 'BulkOrder') return seaMultipleList(payload);
  else return "error";
  //return payload.tree;
}
async function blurTransInfo(payload){
  // side = 1 sell NFT
  // side = 0 buy NFT
  if(payload.message.side === '1') return await bulrSellOrder(payload.message);
  else if(payload.message.side === '0') return bulrBuyOrder(payload.message);
  else return "error";
  //return payload.tree;
}


async function bulrSellOrder(order){
  var asset = {
    changeType:"",
    gas: "",
    in:[],
    out:[],
    approve:null
  }
  let assetIn = await blurAssetHandler(order, 'Token')
  asset.in.push(assetIn);
  let assetOut = await blurAssetHandler(order, 'NFT')
  asset.out.push(assetOut);
  return asset;
}

async function bulrBuyOrder(payload){
  var asset = {
    changeType:"",
    gas: "",
    in:[],
    out:[],
    approve:null
  }
  let assetIn = await blurAssetHandler(order, 'NFT')
  asset.in.push(assetIn);
  let assetOut = await blurAssetHandler(order, 'TOKEN')
  asset.out.push(assetOut);
  return asset;
}

async function blurAssetHandler(order, type){
  let asset = {
    amount:"",
    type: '',
    symbol: '',
    tokenURL: '',
    collectionName: '',
    collectionIconUrl: "",
    title:"",
    osVerified:"",
    tokenId:null,
  }
  try{
    if(type === 'Token'){
      const itemData = {
        token: order.paymentToken,
      }
      asset.amount = order.price
      var rate = 0
      console.log(order.fees)
      await Promise.all(order.fees.map(async fee => {
        console.log(rate)
        rate += Number(fee.rate)
      }))
      rate = 100 - rate/100;
      asset.amount = (Number(asset.amount)*rate/100).toString();
      asset.amount = web3.utils.fromWei( asset.amount, "ether");
      if(order.paymentToken === '0x0000000000000000000000000000000000000000'){ //ETH
        asset.type = 'NATIVE'
        asset.symbol = 'ETH'
        asset.tokenURL = 'https://static.alchemyapi.io/images/network-assets/eth.png'
        asset.collectionName = 'Ethereum'
        return asset
      }
      await erc20Metadata(asset, itemData);
      return asset;

    }
    else if(type === 'NFT'){
      const itemData = {
        token: order.collection,
        tokenId: order.tokenId
      }
      asset.amount = order.amount;
      asset.tokenId = order.tokenId;
      await NFTMetadata(asset, itemData)
      return asset;
    }
  } catch (err) {
    return "data error";
  }

}

async function seaSingleList(payload){
  var asset = {
    changeType: "",
    gas: "",
    in: [],
    out: [],
    approve: null
  }
  const order = payload.message
  const address = order.offerer
  await Promise.all(order.consideration.map(async item => {
    if (address === item.recipient) {
      let Asset_in = await SeaportAssetHandler(item)
      asset.in.push(Asset_in);
    }
  }))
  await Promise.all(order.offer.map(async item => {
    let Asset_out = await SeaportAssetHandler(item);
    //console.log(Asset_out);
    asset.out.push(Asset_out);
  }))
  return asset;
}

async function seaMultipleList(payload) {
  var asset = {
    changeType: "",
    gas: "",
    in: [],
    out: [],
    approve: null
  }
  //const address = payload.tree.offerer
  for (const order of payload.message.tree) {
    const address = order.offerer
    await Promise.all(order.consideration.map(async item => {
      if (address === item.recipient) {
        let Asset_in = await SeaportAssetHandler(item)
        asset.in.push(Asset_in);
      }
    }))
    await Promise.all(order.offer.map(async item => {
      let Asset_out = await SeaportAssetHandler(item);
      //console.log(Asset_out);
      asset.out.push(Asset_out);
    }))
  }
  //console.log(asset)
  return asset

}

async function SeaportAssetHandler(item) {
  let asset = {
    amount: "",
    type: '',
    symbol: '',
    tokenURL: '',
    collectionName: '',
    collectionIconUrl: "",
    title: "",
    osVerified: "",
    tokenId: null,
  }
  const itemData = {
    token: item.token,
    tokenId: item.identifierOrCriteria

  }

  asset.amount = web3.utils.fromWei( item.endAmount, "ether");
  switch(item.itemType){
    case '0': //eth
      asset.amount = Number(asset.amount).toFixed(4);
      asset.type = 'NATIVE'
      asset.symbol = 'ETH'
      asset.tokenURL = 'https://static.alchemyapi.io/images/network-assets/eth.png'
      asset.collectionName = 'Ethereum'
      return asset
    case '1': //erc20
    asset.amount = Number(asset.amount).toFixed(4);
      await erc20Metadata(asset, itemData);
      return asset;
    case '2': //nft 
    case '3': //erc1155 token
      asset.amount = item.endAmount;
      //asset.amount = web3.utils.fromWei( item.endAmount, "ether");
      asset.tokenId = item.identifierOrCriteria;
      await NFTMetadata(asset, itemData)
      return asset;
    case '4': //nft bit 
      //asset.amount = web3.utils.fromWei( item.endAmount, "ether");
      asset.amount = item.endAmount;
      await ContractMetadata(asset, itemData)
      return asset;

  }
}

const erc20Metadata = async (asset, item) => {
  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'alchemy_getTokenMetadata',
      params: [
        item.token
      ]
    })
  };
  const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  try {
    const response = await fetchWithRetry(url, options)
    const data = await response.json();
    asset.type = 'ERC20'
    asset.tokenURL = data.result.logo;
    asset.collectionName = data.result.name;
    asset.symbol = data.result.symbol;
  } catch (err) {
    console.log(err.message);
    return 'fetching error';
  }
}

const NFTMetadata = async (asset, item) => {
  // single NFT
  try {
    const response = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${item.token}&tokenId=${item.tokenId}`);
    const data = await response.json();
    asset.type = data.contractMetadata.tokenType;
    asset.symbol = data.contractMetadata.symbol ?  data.contractMetadata.symbol: "NFT";
    asset.tokenURL = data.media[0].gateway;
    asset.title = data.title;
    asset.collectionName = data.contractMetadata.openSea.collectionName;
    asset.osVerified = data.contractMetadata.openSea.safelistRequestStatus;
    asset.collectionIconUrl = data.contractMetadata.openSea.imageUrl;
    
  } catch (err) {
    console.log(err.message);
    return 'fetching error';
  }
}

const ContractMetadata = async (asset, item) => {
  // series NFT
  try {
    const response = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}/getContractMetadata?contractAddress=${item.token}`);
    const data = await response.json();
    asset.type = data.contractMetadata.tokenType;
    asset.symbol = data.contractMetadata.symbol ?  data.contractMetadata.symbol: "NFT";
    asset.tokenURL = data.contractMetadata.openSea.imageUrl;
    asset.title = data.contractMetadata.name;
    asset.collectionName = data.contractMetadata.openSea.collectionName;
    asset.osVerified = data.contractMetadata.openSea.safelistRequestStatus;
    asset.collectionIconUrl = data.contractMetadata.openSea.imageUrl;
  } catch (err) {
    console.log(err.message);
    return 'fetching error';
  }
}