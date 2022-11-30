import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import dataService from '../dataService';
import contractFeedBack from '../types/contractFeedBackType';


export const Report = (feedBack: contractFeedBack) =>{
    const initContractFeedBack = {
        nameTag: 'Default Name',
        categoryTag: 'Default category',
        featureTag: 'Default feature'
    }
    const [contractFeedBack, setContractFeedBack] = useState<contractFeedBack>(initContractFeedBack)
    return (
        <div className='flex flex-col'>         
            <form className='flex flex-col'>
                <input type={'text'} placeholder='Name'></input>
                <input type={'text'} placeholder='Category'></input>
                <input type={'text'} placeholder='Feature'></input>
                <input type={'submit'} value="Press to report"/>
            </form>
        </div>
    );
};

// ReactDom.render(
//     <React.StrictMode>
//         <Report nameTag={''} categoryTag={''} featureTag={''} />
//     </React.StrictMode>,
//     document.getElementById('root')
// );