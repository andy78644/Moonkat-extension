import React, { useState, useEffect } from "react";
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
    gasPrice: string | '';
    userAddress: string | null;
};


const Main = (props: Props) => {
    const { id, mode, browserMsg, userAddress, gasPrice} = props;
    // This address is to pass the server restriction
    // Need to be edited to develop the sign feature
    const [transactionResult, settransactionResultState] = useState({to:'Default To'})
    const [renderMode, setRenderMode] = useState('')
    const [hasLoaded, setHasLoaded] = useState(false);
    useEffect(() => {
        if (mode === 'transaction') {
            const transaction = JSON.parse(browserMsg)
            if (!transaction) {
                setRenderMode("debug-end")
                setHasLoaded(true)
            }
            const getPreview = async (transaction: any) => {
                await dataService.postTransactionSimulation(transaction)
                    .then(res => {
                        recordUpdate(id, res, "simulate").then((res)=>{console.log(res)})
                        res.gasPrice = gasPrice
                        res.to = transaction.to
                        settransactionResultState(res)
                        if (res.changeType === 'APPROVE') setRenderMode('transaction-assets-approval')
                        else setRenderMode('transaction-assets-exchange')
                        setHasLoaded(true)
                    })
                    .catch((err) => {
                        console.log('Simulation Failed: ', err.message)
                        setRenderMode("debug-end")
                        setHasLoaded(true)
                    })
                delete transaction.maxFeePerGas
                delete transaction.maxPriorityFeePerGas
            }
            getPreview(transaction)
            }
        else {
            setRenderMode(mode)
            setHasLoaded(true)
        }
    }, [mode])


    const recordUpdate = async (msgId: any, data: any, method: string) => {
        let recordData = {}
        if(method === "behavior"){
            recordData = {
                msgId: msgId,
                Behavior: data,
            }
        }   
        if(method === "simulate"){
            recordData = {
                msgId: msgId,
                SimulationResult: data,
            }
        }   
        const result = await dataService.postURL(recordData, method)
        .catch((err)=>{
            console.log('PostURL error:', err)
            return err
        })
        if(result) return false
        else return true
    }

    // Close extension
    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, { id, data });
        if(data) await recordUpdate(id, "accept", "behavior")
        else await recordUpdate(id, "reject", "behavior")
        window.close();
    }
    const accept = () => extensionResponse(true);
    const reject = () => extensionResponse(false);

    const renderCurrentSelection = (renderMode: string | null) => {
        console.log('renderMode: ', renderMode)
        switch (renderMode) {
            case 'transaction-assets-exchange': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <ContractInfo mode={renderMode} transaction={transactionResult.to} />
                        <Transfer mode={renderMode} transaction={transactionResult} />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'transaction-assets-approval': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <ContractInfo mode={renderMode} transaction={transactionResult} />
                        <Transfer mode={renderMode} transaction={transactionResult} />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'transaction-not-configured': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <SimulationError />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-no-risk-safe': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <Safe />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )

            }
            case 'signature-712': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <EIP712 />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-no-risk-malicious': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <Malicious />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-token-approval': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <ContractInfo mode={renderMode} transaction={transactionResult.to} />
                        <Transfer mode={mode} transaction={transactionResult} />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-move-assets': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <ContractInfo mode={renderMode} transaction={transactionResult.to} />
                        <Transfer mode={mode} transaction={transactionResult} />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-not-configured': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <SignatureError />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'debug-end': {
                return (
                    <div className="fullScreenSetup">
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <SimulationError />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'wrong-chain': {
                return (
                    <div className="fullScreenSetup">
                        <h1> Moonkat does not support this chain</h1>
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
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
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress} />
                        <Loading />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
            }
        </div>)
}

export default Main;
