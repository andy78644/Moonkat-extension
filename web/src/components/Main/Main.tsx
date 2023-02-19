import React, {useState, useEffect} from "react";
import dataService from "../../dataService";
import Safe from '../Signature/Safe';
import Malicious from '../Signature/Malicious';
import Transfer from "../Transfer/Transfer";
import Footer from "./Footer";
import Loading from "./Loading";
import Browser from "webextension-polyfill";
import ContractInfo from "./ContractInfo";
import MainHeader from "./MainHeader";

import './Main.css'

interface Props {
    id: string | null;
    mode: string | 'Error';
    browserMsg: string | null;
};


const Main = (props: Props) => {
    // props
    const { id, mode, browserMsg } = props;
    const [previewTxn, setPreviewTxnState] = useState({})
    const [hasLoaded, setHasLoaded] = useState(false);
    let transaction = {
        to:''
    }
    if (mode.split('-')[0] === 'transaction'){
        transaction = JSON.parse(browserMsg ?? 'error')
        useEffect(() => {
            const getPreview = async (transaction:any) => {
                await dataService.postTransactionSimulation(transaction)
                    .then(res => {
                        setPreviewTxnState(res)
                        setHasLoaded(true)
                        return res
                    })
                    .catch((err)=>{
                        console.log('Server is down: ', err)
                    })
            }
            getPreview(transaction)
                .catch(e => {
                    setHasLoaded(true)
                });
        }, [])
        console.log('previewTxn: ', JSON.stringify(previewTxn))
    }
    else{
        useEffect(() => {
        setHasLoaded(true)})
    }  
    // Close extension
    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, { id, data });
        window.close();
    }
    const accept = () => extensionResponse(true);
    const reject = () => extensionResponse(false);
    const renderCurrentSelection = (mode: string | null) => {
        switch (mode) {
            case 'transaction-assets-exchange': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <ContractInfo mode={mode} contractData={transaction.to}/>
                        <Transfer mode={mode} transaction={previewTxn}/>
                        <Footer onAccept={accept} onReject={reject} />
                    </>
                )
            }
            case 'transaction-assets-approval': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <ContractInfo mode={mode} contractData={transaction.to}/>
                        <Transfer mode={mode} transaction={previewTxn}/>
                        <Footer onAccept={accept} onReject={reject} />
                    </>
                )
            }
            case 'signature-no-risk-safe': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <Safe />
                        <Footer onAccept={accept} onReject={reject} />
                    </>
                )
            }
            case 'signature-no-risk-malicious': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <Malicious />
                        <Footer onAccept={accept} onReject={reject} />
                    </>
                )
            }
            case 'signature-token-approval': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <ContractInfo mode={mode} contractData={transaction.to}/>
                        <Transfer mode={mode} transaction={previewTxn}/>
                        <Footer onAccept={accept} onReject={reject} />
                    </>
                )
            }
            case 'signature-move-assets': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <ContractInfo mode={mode} contractData={transaction.to}/>
                        <Transfer mode={mode} transaction={previewTxn}/>
                        <Footer onAccept={accept} onReject={reject} />
                    </>
                )
            }
            case 'signature-not-detected': {
                return <div></div>
            }
            }
    }
    
    return (
    <div>
        {
        hasLoaded?
        <div>
            {renderCurrentSelection(mode)}
        </div>
        :
        <Loading />
        }
    </div>)
}

export default Main;
