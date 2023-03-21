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
  if (txn.assetType === 'ERC20' || txn.assetType === 'NATIVE'){
    asset.amount = Number(txn.amount).toFixed(4);
    asset.tokenURL = txn.logo
    asset.collectionName = txn.name
  }
  else{
    await fetch(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}\n
    /getNFTMetadata?contractAddress=${txn.contractAddress}&tokenId=${txn.tokenId}`)
    .then(response => 
      response.json()
    )
    .then(response => {
      console.log('getAssetData: ', response)
      if (response.error) asset.tokenURL = response.contractMetadata.openSea.imageUrl
      else asset.tokenURL = response.media[0].gateway
      asset.collectionIconUrl = response.contractMetadata.openSea.imageUrl
      asset.title = response.title
      asset.collectionName = response.contractMetadata.openSea.collectionName
      asset.osVerified = response.contractMetadata.openSea.safelistRequestStatus
      asset.amount = txn.amount
      asset.tokenId = txn.tokenId
    })
    .catch(err => {
      console.log(err.message) 
      return 'fetching error'    
    })
  }
}

const getApproveData = async (asset, txn) => {
  if (txn.assetType === 'ERC20' || txn.assetType === 'NATIVE'){
    asset.amount = Number(txn.amount).toFixed(4);
    asset.tokenURL = txn.logo
    asset.collectionName = txn.name
  }
  else{
    await fetch(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}\n
    /getContractMetadata?contractAddress=${txn.contractAddress}`)
    .then(response => 
      response.json()
    )
    .then(response => {
      console.log('getApproveData: ', response)
      asset.tokenURL = response.contractMetadata.openSea.imageUrl
      asset.title = response.name
      asset.collectionName = response.contractMetadata.openSea.collectionName
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
    symbol:"",
    contractAddress:"",
    amount:"",
    tokenURL:"",
    collectionName:"",
    title:"",
    osVerified:""
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
    amount:"",
    type:"",
    symbol:"",
    tokenURL:"",
    collectionName:"",
    collectionIconUrl:"",
    title:"",
    osVerified:"",
    tokenId:null,
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
    console.log('t: ',txn)
    let transactionInfo = {
      changeType:"",
      gas: "",
      in:[],
      out:[],
      approve:null
    };
    
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json'},
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
      .then((response)=>
        response.json())
        .then(async response => {
          console.log('Simulation Response: ', response)
          if(response.error){
            res.status(500).send({
              message:response.error.message
            })
            return
          }
          const result = response.result
          transactionInfo.gas = result.gasUsed
          let errStat = false
          for ( let changeObj of result.changes){
              if(changeObj.from === from){
                if (changeObj.changeType === 'APPROVE'){
                  assetApprove = await approvalHandler(changeObj)
                  transactionInfo.changeType = 'APPROVE'
                  transactionInfo.approve = assetApprove
                  console.log('Approve: ', transactionInfo)
                }
                else if (changeObj.changeType === 'TRANSFER'){
                  transactionInfo.changeType = 'TRANSFER'
                  await transferHandler(changeObj)
                  .then((res)=>{
                    transactionInfo.out.push(res)
                  })
                  .catch((err)=>{
                    errStat = true
                  })
                }
              }
              else if(changeObj.to === from){
                if (changeObj.changeType === 'TRANSFER'){
                  transactionInfo.changeType = 'TRANSFER'
                  await transferHandler(changeObj)
                  .then((res)=>{
                    transactionInfo.in.push(res)
                  })
                  .catch((err)=>{
                    errStat = true
                  })
                }
              }
          }
          console.log('Transfer: ', transactionInfo)
          if (errStat) res.status(500).send({message: "something wrong"})
          else if (transactionInfo.in.length===0 && transactionInfo.out.length===0 && !transactionInfo.approve) res.status(500).send({message: "something wrong"})
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
  openseaTransInfo(req.body)
  res.status(200).send();

}

async function openseaTransInfo(payload){
  //const offerAddress = payload
  let transactionInfo = {
    changeType:"",
    gas: "",
    in:[],
    out:[],
    approve:null
  };
  let asset_in = {
    amount:"",
    type: 'NATIVE',
    symbol: 'ETH',
    tokenURL: 'https://static.alchemyapi.io/images/network-assets/eth.png',
    collectionName: 'Ethereum',
    collectionIconUrl: "",
    title:"",
    osVerified:"",
    tokenId:null,
  }
  seaMultipleList(payload)
  return payload.tree;
}

async function seaMultipleList(payload, address){
  var asset = {
    in:[],
    out: []
  }
  console.log(payload.tree[0].offer)
  payload.tree.forEach(order => {
    //tmpAsset_in.amount = web3.utils.fromWei(item.consideration[0].startAmount, "ether")
    //asset.in[i].amount = asset_in.amount;
    order.consideration.forEach(item => {
      if(address === item.Recipient){
        var Asset_in = asset_handler(item)
        asset.in.push(Asset_in);
      }
    })
    asset.in.push(tmpAsset_in);
  });
  console.log(asset)
}

const asset_handler = async(item) => {
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
  switch(item.ItemType){
    case 0: //eth
      asset.type = 'NATIVE'
      asset.symbol = 'ETH'
      asset.tokenURL = 'https://static.alchemyapi.io/images/network-assets/eth.png'
      asset.collectionName = 'Ethereum'
      return asset
    case 1: //erc20
    case 2: //nft
    case 3: //erc1155 token
    case 4: //nft bit 
  }
}