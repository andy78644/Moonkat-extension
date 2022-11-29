import React, {useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import { Transfer } from './transfer';
import { MoreInfo } from './moreInfo'; 
import { Report } from './report';
import Browser from 'webextension-polyfill';
import Button from '../components/button';

const Menu = () =>{
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const initUserState = {
        showState: ''
    }
    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, {id, data});
        window.close();
      }
    const reject = () => extensionResponse(false);
    const accept = () => extensionResponse(true);
    const [userState, setUserState] = useState(initUserState);
    
    const changeSection =  (section:string) =>{
        let userState = {
            showState: section
        }
        setUserState(userState)
    }

    if(userState.showState === 'moreInfo'){
        return(
        <React.Fragment>
            <MoreInfo/>
            <div className="flex flex-row gap-1 justify-around">
                <Button onClick={() => changeSection('transfer')}> Transfer </Button>
                <Button onClick={() => changeSection('report')}> Report </Button>
                <Button onClick={() => changeSection('moreInfo')}> More Info </Button>
                <Button onClick={reject}> Reject </Button>
            </div>
        </React.Fragment>
        )
    }
    else if(userState.showState === 'report'){
        return(
        <React.Fragment>
            <Report/>
            <div className="flex flex-row gap-1 justify-around">
                <Button onClick={() => changeSection('transfer')}> Transfer </Button>
                <Button onClick={() => changeSection('report')}> Report </Button>
                <Button onClick={() => changeSection('moreInfo')}> More Info </Button>
                <Button onClick={reject}> Reject </Button>
            </div>
        </React.Fragment>
        )
    }
    else{
        return(
        <React.Fragment>
            <Transfer/>
            <div className="flex flex-row gap-1 justify-around">
                <Button onClick={() => changeSection('transfer')}> Transfer </Button>
                <Button onClick={() => changeSection('report')}> Report </Button>
                <Button onClick={() => changeSection('moreInfo')}> More Info </Button>
                <Button onClick={reject}> Reject </Button>
            </div>
        </React.Fragment>
        )
    }
}


ReactDom.render(
    <React.StrictMode>
      <Menu />
    </React.StrictMode>,
    document.getElementById('root')
);