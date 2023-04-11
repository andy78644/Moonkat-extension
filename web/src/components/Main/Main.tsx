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
    const { id, mode, browserMsg, userAddress, gasPrice } = props;
    const [transactionResult, settransactionResultState] = useState({ to: 'Default To' })
    const [signatureResult, setSignatureResultState] = useState({ to: 'Default To' })
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
                        recordUpdate(id, res, "simulate")
                        res.gasPrice = gasPrice
                        res.to = transaction.to
                        settransactionResultState(res)
                        if (res.changeType === 'APPROVE') setRenderMode('transaction-assets-approval')
                        else setRenderMode('transaction-assets-exchange')
                        setHasLoaded(true)
                    })
                    .catch((err) => {
                        setRenderMode("debug-end")
                        setHasLoaded(true)
                    })
                delete transaction.maxFeePerGas
                delete transaction.maxPriorityFeePerGas
            }
            getPreview(transaction)
        }
        else if (mode === 'signature-712') {
            const signature = JSON.parse(browserMsg)
            const signatureAddress = signature.signAddress
            const type = signature.signMethod ?? ''
            if (type ===  'eth_signTypedData' || type === 'eth_signTypedData_v3') {
                setRenderMode('signature-move-assets')
                setHasLoaded(true)
            }
            else {
                const payload = signature.payLoad ?? ''
                const getsignature = async (type: any, payload: any) => {
                    await dataService.postSignature({ type, payload }, "signature")
                        .then(res => {
                            res.to = signatureAddress
                            if (res === null) {
                                setSignatureResultState(res)
                                setRenderMode('signature-move-assets')
                                setHasLoaded(true)
                            } else {
                                setSignatureResultState(res)
                                setRenderMode('signature-712')
                                setHasLoaded(true)
                            }
                        })
                        .catch((err) => {
                            setRenderMode("debug-end")
                            setHasLoaded(true)
                        })
                }
                getsignature(type, payload)
            }
        }
        else {
            setRenderMode(mode)
            setHasLoaded(true)
        }
    }, [mode])

    const recordUpdate = async (msgId: any, data: any, method: string) => {
        let recordData = {}
        if (method === "behavior") {
            recordData = {
                msgId: msgId,
                Behavior: data,
            }
        }
        if (method === "simulate") {
            recordData = {
                msgId: msgId,
                SimulationResult: data,
            }
        }
        const result = await dataService.postRecordDataURL(recordData, method)
            .catch((err) => {
                return err
            })
        if (result) return false
        else return true
    }
    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, { id, data });
        if (data) await recordUpdate(id, "accept", "behavior")
        else await recordUpdate(id, "reject", "behavior")
        window.close();
    }
    const accept = () => extensionResponse(true);
    const reject = () => extensionResponse(false);
    const renderCurrentSelection = (renderMode: string | null) => {
        switch (renderMode) {
            case 'transaction-assets-exchange': {
                return (
                    <div>
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <ContractInfo mode={renderMode} transaction={transactionResult.to} />
                        <Transfer mode={renderMode} transaction={transactionResult} />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'transaction-assets-approval': {
                return (
                    <div>
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <ContractInfo mode={renderMode} transaction={transactionResult} />
                        <Transfer mode={renderMode} transaction={transactionResult} />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'transaction-not-configured': {
                return (
                    <div>
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <SimulationError />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-no-risk-safe': {
                return (
                    <div>
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <Safe />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-712': {
                return (
                    <div>
                        <MainHeader contractAddress={signatureResult.to} userAddress={userAddress}></MainHeader>
                        <ContractInfo mode={renderMode} transaction={signatureResult.to} />
                        <Transfer mode={renderMode} transaction={signatureResult} />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-no-risk-malicious': {
                return (
                    <div>
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <Malicious />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-token-approval': {
                return (
                    <div>
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <ContractInfo mode={renderMode} transaction={transactionResult.to} />
                        <Transfer mode={mode} transaction={transactionResult} />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-move-assets': {
                return (
                    <div>
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <EIP712 />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'signature-not-configured': {
                return (
                    <div>
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <SignatureError />
                        <Footer onAccept={accept} onReject={reject} />
                    </div>
                )
            }
            case 'debug-end': {
                return (
                    <div>
                        <MainHeader contractAddress={transactionResult.to} userAddress={userAddress}></MainHeader>
                        <SimulationError />
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
