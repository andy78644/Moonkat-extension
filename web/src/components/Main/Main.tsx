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
import SimulationError from "../Error/SimulationError";
import SignatureError from "../Error/SignatureError";

import './Main.css'

interface Props {
    id: string | null;
    mode: string | 'Error';
    browserMsg: string | null;
};


const Main = (props: Props) => {
    const { id, mode, browserMsg } = props;
    const [previewTxn, setPreviewTxnState] = useState({})
    const [renderMode, setRenderMode] = useState('')
    const [hasLoaded, setHasLoaded] = useState(false);
    let transaction = {
        to:''
    }
    
    if (mode === 'transaction'){
        transaction = JSON.parse(browserMsg ?? 'error')
        useEffect(() => {
            const getPreview = async (transaction:any) => {
                await dataService.postTransactionSimulation(transaction)
                    .then(res => {
                        setTimeout(() => {
                            setPreviewTxnState(res)
                            if (res.changeType === 'APPROVE') setRenderMode('transaction-assets-approval')
                            else setRenderMode('transaction-assets-exchange')
                            setHasLoaded(true)
                        }, 3000)
                    })
                    .catch((err)=>{
                        setTimeout(() => {
                            setRenderMode("debug-end")
                            setHasLoaded(true)
                            console.log('Server is down: ', err.message)
                        }, 3000)
                    })
            }
            getPreview(transaction)
        }, [])
        console.log('PreviewTxn: ', JSON.stringify(previewTxn))
    }
    else{
        useEffect(() => {
        setRenderMode(mode)
        setHasLoaded(true)})
    }  
    // Close extension
    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, { id, data });
        window.close();
    }
    const accept = () => extensionResponse(true);
    const reject = () => extensionResponse(false);

    const renderCurrentSelection = (renderMode: string | null) => {
        switch (renderMode) {
            case 'transaction-assets-exchange': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <ContractInfo mode={mode} contractData={transaction.to}/>
                        <Transfer mode={renderMode} transaction={previewTxn}/>
                        <Footer onAccept={accept} onReject={reject} />
                    </>
                )
            }
            case 'transaction-assets-approval': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <ContractInfo mode={mode} contractData={transaction.to}/>
                        <Transfer mode={renderMode} transaction={previewTxn}/>
                        <Footer onAccept={accept} onReject={reject} />
                    </>
                )
            }
            case 'transaction-not-configured': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <SimulationError />
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
            case 'signature-not-configured': {
                return (
                    <>
                        <MainHeader></MainHeader>
                        <SignatureError />
                        <Footer onAccept={accept} onReject={reject} />
                    </>
                )
            }
            case 'debug-end': {
                return (<>
                    <h1>Something Wrong Press cancel!</h1>
                    <Footer onAccept={accept} onReject={reject} />
                </>)
            }
            }
    }
    
    return (
    <div>
        {
        hasLoaded ?
        <div>
            {renderCurrentSelection(renderMode)}
        </div>
        :
        <div>
            <MainHeader />
            <Loading />
            <Footer onAccept={accept} onReject={reject} />
        </div>
        }
    </div>)
}

export default Main;
