import { send } from 'process';
import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import dataService from '../dataService';
import contractFeedBack from '../types/contractFeedBackType';


export const Report = (feedBack: contractFeedBack) =>{
    const initContractFeedBack = {
        nameTag: '',
        categoryTag: '',
        featureTag: ''
    }
    const [nameTagReport, setnameTagReport] = useState('')
    const [categoryTagReport, setcategoryTagReport] = useState('')
    const [featureTagReport, setfeatureTagReport] = useState('')
    // const [contractFeedBack, setContractFeedBack] = useState<contractFeedBack>(initContractFeedBack)
    const [isReported, setisReported] = useState(false)
    // const finishReport = async () =>{
    //     let tmp: contractFeedBack = {
    //         nameTag: nameTagReport,
    //         categoryTag: categoryTagReport,
    //         featureTag: featureTagReport
    //     }
    //     setContractFeedBack(tmp)
    //     setisReported(true)
    // }
    const handleSubmit = () =>{
        let address = feedBack.ReportedContract
        dataService.postFeedBackByAddress(address, feedBack)
    }

    return (
        <div className='flex flex-col bg-black'>
            <div className='flex flex-col justify-center items-center bg-zinc-800' id='backgroud'>         
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <label className='text-white'>Name Tag: 
                        <input className='text-zinc-500' type={'text'} value={nameTagReport} onChange={(e)=>setnameTagReport(e.target.value)} placeholder='Name'></input>
                    </label>
                    <label className='text-white'>Category Tag: 
                        <input className='text-zinc-500' type={'text'} value={categoryTagReport} onChange={(e)=>setcategoryTagReport(e.target.value)} placeholder='Category'></input>
                    </label>
                    <label className='text-white'>Feature Tag: 
                        <input className='text-zinc-500' type={'text'} value={featureTagReport} onChange={(e)=>setfeatureTagReport(e.target.value)} placeholder='Feature'></input>
                    </label>
                    <button type={'submit'} value="Press to report"/>
                </form>
                <div className='flex flex-row'>
                    <div>Test Obj Data: </div>
                    <div>{feedBack.NameTag}</div>
                    <div>{feedBack.CategoryTag}</div>
                    <div>{feedBack.Tag[0]}</div>
                </div>
            </div>
        </div>
    );
};
