import React, {useState, useEffect, useCallback} from 'react';
import ReactDom from 'react-dom';
import dataService from '../dataService';
import { Transfer } from './transfer';
import { MoreInfo } from './moreInfo'; 
import { Report } from './report';
import Browser from 'webextension-polyfill';
import Button from '../components/button';
import contractData from '../types/contractType';


const Menu = () =>{
    //Reslove the URL Parameters to get the chain Information
    const params = new URLSearchParams(window.location.search);
    const spender = params.get('spender');
    if (spender === null) return (<div>ERROR: Spender Address === NULL</div>);
    const id = params.get('id');
    const chainId = Number(params.get('chainId'));
    // const createtime = params.get('createTime');
    // const explorerUrl = getExplorerUrl(chainId);
    // const name = params.get('name');
    // const asset = params.get('asset');
    // const address = params.get('address');
    // const spenderName = params.get('spenderName');
    // const bypassed = params.get('bypassed') === 'true';


    const initContractState = {
        Address: "0xABCDEFG",
        TokenType: "Default Type",
        Holders: "Default Holders",
        Balance: 0,
        CreateTime: new Date(2020, 4, 4, 17, 23, 42, 11),
        LastTransactionTime: new Date(2020, 4, 4, 17, 23, 42, 11),
        NumberOfTransaction: 0,
        ReserveSpotOne: "Default Reserved Spot",
        ReserveSpotTwo: "Default Reserved Spot",
        ReserveSpotThree: "Default Reserved Spot",
        ReserveSpotFour: "Default Reserved Spot",
        ReserveSpotFive: "Default Reserved Spot",
        createdAt: new Date(2020, 4, 4, 17, 23, 42, 11),
        updatedAt: new Date(2020, 4, 4, 17, 23, 42, 11),
    }
    const initUserState = {
        showState: ''
    }
    
    const [contractState, setContract] = useState<contractData>(initContractState);
    const [userState, setUserState] = useState(initUserState);
    const [hasLoaded, setHasLoaded] = useState(false);


    useEffect(() => {
        const fetchContract = async () => {
            await dataService.getByAddress(spender)
            .then(res => {
                initContractState.Address = '0x0' + res.Address + '1111'
                setContract(initContractState)
                setHasLoaded(true)
            })
        }
        fetchContract()
        .catch(e => {
            setContract(initContractState)
            setHasLoaded(true)
        });
    }, [])

    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, {id, data});
        window.close();
    }
    const reject = () => extensionResponse(false);
    const accept = () => extensionResponse(true);
    

    const changeSection =  (section:string) =>{
        let userState = {
            showState: section
        }
        setUserState(userState)
    }

    if(hasLoaded === false){
        return(
            <div>
                <h1>Loading ...</h1>
            </div>
        )
    }
    else{
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
                <Report nameTag={''} categoryTag={''} featureTag={''} />
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
                <Transfer { ... contractState}/>
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
}


ReactDom.render(
    <React.StrictMode>
      <Menu/>
    </React.StrictMode>,
    document.getElementById('root')
);