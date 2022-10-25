import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import Browser from 'webextension-polyfill';
import Button from '../components/button';
import contractData from '../types/contractType';
import Link from '../components/link';
import dataService from '../dataService';
import { getExplorerUrl } from '../utils';
import '../styles.css';

const Confirm = () =>{
  const initContractState = {
    address: "",
    scam: false,
    createTime: "Default Create Time",
    safe: 0,
    neutral: 0,
    danger: 0
  }
  const initUserState = {
    confirmReport: false,
    reportState: '',
  }
  //Reslove the URL Parameters to get the chain Information
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const balance = params.get('balance');
  const chainId = Number(params.get('chainId'));
  const spender = params.get('spender');
  if (spender == null) return (<div>ERROR</div>);
  // const createtime = params.get('createTime');
  const createtime = "FakeTime For Dev Propose"
  // const explorerUrl = getExplorerUrl(chainId);
  // const name = params.get('name');
  // const asset = params.get('asset');
  // const address = params.get('address');
  // const spenderName = params.get('spenderName');
  // const bypassed = params.get('bypassed') === 'true';

  // When the confirm page render do the getContract
  useEffect(() => {
    getContract();
  }, []);

  const res = async (data: boolean) => {
    dataService.update(spender, contract)
    await Browser.runtime.sendMessage(undefined, {id, data});
    window.close();
  }
  
  const changeRes = () => {
    dataService.get(spender)
    .then(res=>{
      if(user.reportState=='safe'){
        res.data.safe += 1
      }
      if(user.reportState=='danger'){
        res.data.danger += 1
      }
      if(user.reportState=='neutral'){
        res.data.neutral += 1
      }
      setContract(res.data)
    })
  }
  
  const reject = () => res(false);
  const accept = () => res(true);
  const confirmChange = async () => {
    changeRes()
    setUser(initUserState)
  }
  const rejectChange = () => {
    setUser(initUserState)
  }
  const [contract, setContract] = useState<contractData>(initContractState);
  const [user, setUser] = useState(initUserState);
  const getContract = () => {
    dataService.get(spender)
      .then(res => {
        setContract(res.data)
      })
      .catch(e => {
        initContractState.address=spender
        setContract(initContractState)
        dataService.create(contract)
      });
  }

  // ReFactor Needed
  const updateSafeContract = () => {
    setUser({confirmReport: true, reportState:'safe'})
  }
  const updateDangerContract = () => {
    setUser({confirmReport: true, reportState:'danger'})
  }
  const updateNeutralContract = () => {
    setUser({confirmReport: true, reportState:'neutral'})
  }
  return ( 
    <div className="flex flex-col gap-3  p-4">
      <div className="flex flex-wrap justify-center items-center gap-2">
        <div className="font-bold text-lg"> ComPas </div>
      </div>
      {user.confirmReport ? (
        <div className='flex flex-col items-center'>
        <div>Are You Sure to report this state ?</div>
        <div className='flex flex-row items-around'>
          <Button onClick={confirmChange}> Confirm </Button>
          <Button onClick={rejectChange}> Reject </Button>
        </div>
      </div>
      ) : (<div className='flex flex-col'>
            <div className="flex items-center justify-start border cursor-pointer rounded-xl ">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                        <h2 className="text-lg font-bold sm:text-2xl ">Contract Address</h2>
                        <div className="px-2 text-s rounded-full sm:px-4 sm:py-1 ">
                            {spender}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-start border cursor-pointer rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                        <h2 className="text-lg font-bold sm:text-2xl">Contract Balance</h2>
                        <div className="px-2 text-s rounded-full sm:px-4 sm:py-1 ">
                            {balance}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-start border cursor-pointer rounded-xl">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                        <h2 className="text-lg font-bold sm:text-2xl ">Create at</h2>
                        <div className="px-2 text-s rounded-full sm:px-4 sm:py-1  ">
                            {createtime}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-1 pt-2 justify-around'>
              <span className='contents '>
                <span>Safe Count: {contract.safe}</span> 
                <span>Neutral Count: {contract.neutral}</span> 
                <span>Danger Count: {contract.danger}</span> 
              </span>
            </div>
            <div className='flex gap-1 pt-2 justify-around'>
              <Button onClick={updateSafeContract}> Safe Contract</Button>
              <Button onClick={updateNeutralContract}> Neutral Contract</Button>
              <Button onClick={updateDangerContract}> Danger Contract</Button>
            </div>
            <div className="flex gap-1 pt-2 justify-around">
              <Button onClick={reject}> Reject </Button>
              <Button onClick={accept}> Accept </Button>
            </div>
          </div>
      )}
  </div>
  );
};

ReactDom.render(
    <React.StrictMode>
      <Confirm />
    </React.StrictMode>,
    document.getElementById('root')
);