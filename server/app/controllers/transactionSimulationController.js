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
    asset.tokenURL = txn.logo ? txn.logo : null;
    asset.collectionName = txn.name ?txn.name: null;
    asset.symbol = txn.symbol ? txn.symbol:null;
    asset.title = txn.symbol ? txn.symbol:null;
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

        asset.title = response.title ? response.title : null;

        asset.type = response.contractMetadata.tokenType ? response.contractMetadata.tokenType : null;
        asset.symbol = response.contractMetadata.symbol ? response.contractMetadata.symbol : "NFT";
        asset.collectionName = response.contractMetadata.name ? response.contractMetadata.name : null;

        if (response.error) asset.tokenURL = response.contractMetadata.openSea.imageUrl ? response.contractMetadata.openSea.imageUrl : null;
        else asset.tokenURL = response.media[0].gateway ? response.media[0].gateway : null;

        asset.osVerified = response.contractMetadata.openSea.safelistRequestStatus ? response.contractMetadata.openSea.safelistRequestStatus : null;
        asset.collectionIconUrl = response.contractMetadata.openSea.imageUrl ? response.contractMetadata.openSea.imageUrl : null;
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
    asset.collectionIconUrl = txn.logo ? txn.logo : null;
    asset.collectionName = txn.name ?txn.name: null;
    asset.title = txn.symbol ? txn.symbol:null;
  }
  else {
    await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}\n
    /getContractMetadata?contractAddress=${txn.contractAddress}`)
      .then(response =>
        response.json()
      )
      .then(response => {
        console.log('getApproveData: ', response)
        asset.collectionIconUrl = response.contractMetadata.openSea.imageUrl ? response.contractMetadata.openSea.imageUrl : null;
        asset.symbol = response.contractMetadata.symbol ? response.contractMetadata.symbol : "NFT";
        asset.collectionName = response.contractMetadata.name ? response.contractMetadata.name : null;
        asset.osVerified = response.contractMetadata.openSea.safelistRequestStatus ? response.contractMetadata.openSea.safelistRequestStatus : null;
      })
      .catch(err => {
        console.log(err.message)
        return 'fetching error'
      })
  }
}
const approvalHandler = async (txn) => {
  let assetApprove = {
    symbol: null,
    contractAddress: null,
    amount: null,
    tokenURL: null,
    collectionName: null,
    title: null,
    osVerified: null
  }
  assetApprove.symbol = txn.symbol
  assetApprove.contractAddress = txn.to
  assetApprove.amount = txn.amount
  let err = await getApproveData(assetApprove, txn)
  console.log(err);
  if (err) return err
  else return assetApprove
}

const transferHandler = async (txn) => {
  let asset = {
    amount: null,
    type: null,
    symbol: null,
    tokenURL: null,
    collectionName: null,
    collectionIconUrl: null,
    title: null,
    osVerified: null,
    tokenId: null,
  }
  asset.type = txn.assetType
  //asset.symbol = txn.symbol
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
  let transactionInfo = null;
  let payload = req.body.payload;
  const openseaContract = [
    '0x00000000006cee72100d161c57ada5bb2be1ca79',
    '0x00000000006c3852cbef3e08e8df289169ede581',
    '0x00000000000006c7676171937c444f6bde3d6282',
    '0x0000000000000ad24e80fd803c6ac37206a45f15',
    '0x00000000000001ad428e4906aE43D8F9852d0dD6',
  ]
  const blurContract = '0x000000000000ad05ccc4f10045630fb830b95127'
  if (req.body.type === 'eth_signTypedData_v4' && payload.domain.name === 'Seaport' && openseaContract.includes(payload.domain.verifyingContract)) { transactionInfo = await openseaTransInfo(payload); }
  else if (req.body.type === 'eth_signTypedData_v4' && payload.domain.name === 'Blur Exchange' && payload.domain.verifyingContract === blurContract) { transactionInfo = await blurTransInfo(payload); }
  if (transactionInfo === "error") res.status(500).send("error");
  res.status(200).send(transactionInfo);

}

async function openseaTransInfo(payload) {
  console.log("[transactionSimulationController.js] [openseaTransInfo]: payload.primaryType is ", payload.primaryType)
  if (payload.primaryType === 'OrderComponents') return await seaSingleList(payload);
  else if (payload.primaryType === 'BulkOrder') return seaMultipleList(payload);
  else return "error";
}
async function blurTransInfo(payload) {
  // side = 1 sell NFT
  // side = 0 buy NFT
  if (payload.message.side === '1') return await bulrSellOrder(payload.message);
  else if (payload.message.side === '0') return bulrBuyOrder(payload.message);
  else return "error";
}


async function bulrSellOrder(order) {
  var asset = {
    changeType: "SIGNATURE",
    gas: null,
    in: [],
    out: [],
    approve: null
  }
  let assetIn = await blurAssetHandler(order, 'Token')
  asset.in.push(assetIn);
  let assetOut = await blurAssetHandler(order, 'NFT')
  asset.out.push(assetOut);
  return asset;
}

async function bulrBuyOrder(payload) {
  var asset = {
    changeType: "SIGNATURE",
    gas: null,
    in: [],
    out: [],
    approve: null
  }
  let assetIn = await blurAssetHandler(order, 'NFT')
  asset.in.push(assetIn);
  let assetOut = await blurAssetHandler(order, 'TOKEN')
  asset.out.push(assetOut);
  return asset;
}

async function blurAssetHandler(order, type) {
  let asset = {
    amount: null,
    type: null,
    symbol: null,
    tokenURL: null,
    collectionName: null,
    collectionIconUrl: null,
    title: null,
    osVerified: null,
    tokenId: null,
  }
  try {
    if (type === 'Token') {
      const itemData = {
        token: order.paymentToken,
      }
      asset.amount = order.price
      var rate = 0
      await Promise.all(order.fees.map(async fee => {
        rate += Number(fee.rate)
      }))
      rate = 100 - rate / 100;
      asset.amount = (Number(asset.amount) * rate / 100).toString();
      asset.amount = web3.utils.fromWei(asset.amount, "ether");
      if (order.paymentToken === '0x0000000000000000000000000000000000000000') { //ETH
        asset.type = 'NATIVE'
        asset.symbol = 'ETH'
        asset.tokenURL = 'https://static.alchemyapi.io/images/network-assets/eth.png'
        asset.collectionName = 'Ethereum'
        return asset
      }
      await erc20Metadata(asset, itemData);
      return asset;

    }
    else if (type === 'NFT') {
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

async function seaSingleList(payload) {
  var asset = {
    changeType: "SIGNATURE",
    gas: null,
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
    asset.out.push(Asset_out);
  }))
  return asset;
}

async function seaMultipleList(payload) {
  var asset = {
    changeType: "SIGNATURE",
    gas: null,
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
      asset.out.push(Asset_out);
    }))
  }
  return asset

}

async function SeaportAssetHandler(item) {
  let asset = {
    amount: null,
    type: null,
    symbol: null,
    tokenURL: null,
    collectionName: null,
    collectionIconUrl: null,
    title: null,
    osVerified: null,
    tokenId: null,

  }
  const itemData = {
    token: item.token,
    tokenId: item.identifierOrCriteria

  }

  asset.amount = web3.utils.fromWei(item.endAmount, "ether");
  switch (item.itemType) {
    case '0': //eth
      asset.amount = Number(asset.amount).toFixed(4);
      asset.type = 'NATIVE'
      asset.symbol = 'ETH'
      asset.tokenURL = 'https://static.alchemyapi.io/images/network-assets/eth.png'
      asset.title = 'ETH'
      asset.collectionName = 'Ethereum'
      return asset
    case '1': //erc20
      asset.amount = Number(asset.amount).toFixed(4);
      await erc20Metadata(asset, itemData);
      return asset;
    case '2': //nft 
    case '3': //erc1155 token
      asset.amount = item.endAmount;
      asset.tokenId = item.identifierOrCriteria;
      await NFTMetadata(asset, itemData)
      return asset;
    case '4': //nft bit 
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
    asset.tokenURL = data.result.logo ? data.result.logo : null;
    asset.title = data.result.symbol ? data.result.symbol : null;
    asset.symbol = data.result.symbol ? data.result.symbol : null;
    asset.collectionName = data.result.name ? data.result.name : null;
  } catch (err) {
    console.log(err.message);
    return 'fetching error';
  }
}

const NFTMetadata = async (asset, item) => {
  try {
    const response = await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${item.token}&tokenId=${item.tokenId}`);
    const data = await response.json();
    asset.title = data.title ? data.title : null;

    asset.type = data.contractMetadata.tokenType ? data.contractMetadata.tokenType : null;
    asset.symbol = data.contractMetadata.symbol ? data.contractMetadata.symbol : "NFT";
    asset.collectionName = data.contractMetadata.name ? data.contractMetadata.name : null;

    if (response.error) asset.tokenURL = data.contractMetadata.openSea.imageUrl ? data.contractMetadata.openSea.imageUrl : null;
    else asset.tokenURL = data.media[0].gateway ? data.media[0].gateway : null;

    asset.osVerified = data.contractMetadata.openSea.safelistRequestStatus ? data.contractMetadata.openSea.safelistRequestStatus : null;
    asset.collectionIconUrl = data.contractMetadata.openSea.imageUrl ? data.contractMetadata.openSea.imageUrl : null;
  } catch (err) {
    console.log(err.message);
    return 'fetching error';
  }
}

const ContractMetadata = async (asset, item) => {
  try {
    const response = await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}/getContractMetadata?contractAddress=${item.token}`);
    const data = await response.json();
    asset.type = data.contractMetadata.tokenType ? data.contractMetadata.tokenType : null;
    asset.symbol = data.contractMetadata.symbol ? data.contractMetadata.symbol : "NFT";
    asset.title = data.contractMetadata.name ? data.contractMetadata.name : null;
    asset.collectionName = data.contractMetadata.name ? data.contractMetadata.name : null;

    asset.tokenURL = data.contractMetadata.openSea.imageUrl ? data.contractMetadata.openSea.imageUrl : null;

    asset.osVerified = data.contractMetadata.openSea.safelistRequestStatus ? data.contractMetadata.openSea.safelistRequestStatus : null;
    asset.collectionIconUrl = data.contractMetadata.openSea.imageUrl ? data.contractMetadata.openSea.imageUrl : null;
  } catch (err) {
    console.log(err.message);
    return 'fetching error';
  }
}