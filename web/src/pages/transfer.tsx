import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import contractFeedBack from '../types/contractFeedBackType';
import contractData from '../types/contractType'
import Link from '../components/link';
import { getExplorerUrl } from '../utils';
import '../styles.css';
import { Contract } from 'ethers';

export const Transfer = (contract:contractData) =>{
  const params = new URLSearchParams(window.location.search);
  const symbol = params.get('symbol');
  const initContractFeedBack = {
    nameTag: "Init Name Tag",
    categoryTag: "Init Category Tag",
    featureTag: "Init Feature Tag"
  }
  const [contractFeedBack, setContractFeedBack] = useState<contractFeedBack>(initContractFeedBack);
  return ( 
    <>
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-center items-center gap-2 bg-black">
        <div className="font-bold text-lg text-white"> {symbol} </div>
        <div className="font-bold text-lg text-white"> {contract.address} </div>
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
                            {contract.balance}
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
    </>
  );
};



// ReactDom.render(
//     <React.StrictMode>
//       <Transfer {... contract}/>
//     </React.StrictMode>,
//     document.getElementById('root')
// );
