import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import contract from '../types/contractType';
import contractFeedBack from '../types/contractFeedBackType';
import Link from '../components/link';
import dataService from '../dataService';
import { getExplorerUrl } from '../utils';
import '../styles.css';

export const Transfer = () =>{
  const initContractState = {
    address: "0xABCDEFG",
    tokenType: "Default Type",
    holders: "Default Holders",
    balance: 0,
    createTime: new Date(2020, 4, 4, 17, 23, 42, 11),
    lastTransactionTime: new Date(2020, 4, 4, 17, 23, 42, 11),
    numberOfTransaction: 0,
    reserveSpotOne: "Default Reserved Spot",
    reserveSpotTwo: "Default Reserved Spot",
    reserveSpotThree: "Default Reserved Spot",
    reserveSpotFour: "Default Reserved Spot",
    reserveSpotFive: "Default Reserved Spot",
  }
  const initContractFeedBack = {
    nameTag: "Test Name Tag",
    categoryTag: "Test Category Tag",
    featureTag: "Test Feature Tag"
  }

  //Reslove the URL Parameters to get the chain Information
  const params = new URLSearchParams(window.location.search);
  const spender = params.get('spender');
  if (spender == null) return (<div>ERROR</div>);
  const id = params.get('id');
  const balance = params.get('balance');
  const chainId = Number(params.get('chainId'));
  // const createtime = params.get('createTime');
  const createtime = "FakeTime For Dev Propose"

  const symbol = params.get('symbol');
  // const explorerUrl = getExplorerUrl(chainId);
  // const name = params.get('name');
  // const asset = params.get('asset');
  // const address = params.get('address');
  // const spenderName = params.get('spenderName');
  // const bypassed = params.get('bypassed') === 'true';

  useEffect(() => {
    getContract();
  }, []);
  

  const [contract, setContract] = useState<contract>(initContractState);
  const [contractFeedBack, setContractFeedBack] = useState<contractFeedBack>(initContractFeedBack);

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

  return ( 
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-center items-center gap-2 bg-black">
        <div className="font-bold text-lg text-white"> {symbol} </div>
        <div className="font-bold text-lg text-white"> {spender} </div>
      </div>
      <div className='flex flex-row flex-nowrap gap-3 bg-black'>
        <div className='text-white'> {contractFeedBack.nameTag} </div>
        <div className='text-white'> {contractFeedBack.categoryTag} </div>
        <div className='text-white'> {contractFeedBack.featureTag } </div>
      </div>
      <div className='flex flex-col'>
            <div className='flex justify-start border cursor-pointer rounded-xl flex-col bg-zinc-800'>
              <div className='font-bold text-white'> Asset In </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                        <h2 className="text-lg font-bold sm:text-2xl text-white">Contract Balance</h2>
                        <div className="px-2 text-s rounded-full sm:px-4 sm:py-1 text-white">
                            {balance}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-start border cursor-pointer rounded-xl flex-col bg-zinc-800'>
              <div className='font-bold text-white'> Asset Out </div>
              <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1">
                        <h2 className="text-lg font-bold sm:text-2xl text-white">Contract Cool Stuff</h2>
                        <div className="px-2 text-s rounded-full sm:px-4 sm:py-1 text-white">
                            12000 wBTC
                        </div>
                        <div className="px-2 text-s rounded-full sm:px-4 sm:py-1 text-white">
                            1 ETH
                        </div>
                    </div>
                </div>
            </div>
          </div>
    </div>
  );
};



ReactDom.render(
    <React.StrictMode>
      <Transfer />
    </React.StrictMode>,
    document.getElementById('root')
);
