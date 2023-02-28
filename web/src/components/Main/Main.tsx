import React, {useState, useEffect} from "react";
import dataService from "../../dataService";
import Safe from '../Signature/Safe';
import EIP712 from '../Signature/EIP712'
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
    mode: string | '';
    browserMsg: string | '';
    userAddress: string | null;
};


const Main = (props: Props) => {
    const { id, mode, browserMsg, userAddress } = props;
    const [previewTxn, setPreviewTxnState] = useState({})
    const [renderMode, setRenderMode] = useState('')
    const [hasLoaded, setHasLoaded] = useState(false);
    let transaction = {
        // This address is to pass the server restriction
        // Need to be edited to develop the sign feature
        to:'0x1533858eBed0A40dB54b5b70347181Db4724855F',
    }
    useEffect(()=>{
        if (mode === 'transaction'){
            if(!transaction) {
                setRenderMode("debug-end")
                setHasLoaded(true)
            }
            transaction = JSON.parse(browserMsg)
            const getPreview = async (transaction:any) => {
                const gasPrice = transaction.gasPrice
                delete transaction.gasPrice
                transaction.maxFeePerGas = '0x0'
                transaction.maxPriorityFeePerGas = '0x0'
                await dataService.postTransactionSimulation(transaction)
                    .then(res => {
                        setTimeout(() => {
                            res.gasPrice = gasPrice
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
                            console.log('Simulation Failed: ', err.message)
                        }, 3000)
                    })
            }
            getPreview(transaction)
            console.log('PreviewTxn: ', JSON.stringify(previewTxn))
        }
        else{
            setRenderMode(mode)
            setHasLoaded(true)
        }  
    })
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
                            <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                            <ContractInfo mode={mode} address={transaction.to}/>
                            <Transfer mode={renderMode} transaction={previewTxn}/>
                            <Footer onAccept={accept} onReject={reject} />
                        </>
                    )
                }
                case 'transaction-assets-approval': {
                    return (
                        <>
                            <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                            <ContractInfo mode={mode} address={transaction.to}/>
                            <Transfer mode={renderMode} transaction={previewTxn}/>
                            <Footer onAccept={accept} onReject={reject} />
                        </>
                    )
                }
                case 'transaction-not-configured': {
                    return (
                        <>
                            <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                            <SimulationError />
                            <Footer onAccept={accept} onReject={reject} />
                        </>
                    )
                }
                case 'signature-no-risk-safe': {
                    return (
                        <>
                            <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                            <Safe />
                            <Footer onAccept={accept} onReject={reject} />
                        </>
                    )

                }
                case 'signature-712': {
                    return (
                        <>
                            <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                            <EIP712 />
                            <Footer onAccept={accept} onReject={reject} />
                        </>
                    )
                }
                case 'signature-no-risk-malicious': {
                    return (
                        <>
                            <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                            <Malicious />
                            <Footer onAccept={accept} onReject={reject} />
                        </>
                    )
                }
                case 'signature-token-approval': {
                    return (
                        <>
                            <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                            <ContractInfo mode={mode} address={transaction.to}/>
                            <Transfer mode={mode} transaction={previewTxn}/>
                            <Footer onAccept={accept} onReject={reject} />
                        </>
                    )
                }
                case 'signature-move-assets': {
                    return (
                        <>
                            <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                            <ContractInfo mode={mode} address={transaction.to}/>
                            <Transfer mode={mode} transaction={previewTxn}/>
                            <Footer onAccept={accept} onReject={reject} />
                        </>
                    )
                }
                case 'signature-not-configured': {
                    return (
                        <>
                            <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                            <SignatureError />
                            <Footer onAccept={accept} onReject={reject} />
                        </>
                    )
                }
                case 'debug-end': {
                    return (
                    <>
                        <MainHeader contractAddress={transaction.to} userAddress={userAddress}></MainHeader>
                        <SimulationError />
                        <Footer onAccept={accept} onReject={reject} />
                    </>)
                }
                case 'wrong-chain': {
                    return (<>
                        <h1> Moonkat does not support this chain</h1>
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
            <MainHeader contractAddress={transaction.to} userAddress={userAddress} />
            <Loading />
            <Footer onAccept={accept} onReject={reject} />
        </div>
        }
    </div>)
}

export default Main;
