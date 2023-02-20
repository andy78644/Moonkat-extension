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
    mode: string | null;
    browserMsg: string | null;
};


const Main = (props: Props) => {
    // props
    const { id, mode, browserMsg } = props;
    const [previewTxn, setTxnState] = useState({})
    const [hasLoaded, setHasLoaded] = useState(false);
    const transaction = JSON.parse(browserMsg ?? 'error')
    console.log('b')
    useEffect(() => {
        const getPreview = async (transaction:any) => {
            await dataService.postTransactionSimulation(transaction)
                .then(res => {
                    setTxnState(res)
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

    console.log('a: ', JSON.stringify(previewTxn))
    // Close extension
    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, { id, data });
        window.close();
    }
    const accept = () => extensionResponse(true);
    const reject = () => extensionResponse(false);
    const Test = () => {
        return (
            <>
            {mode}, TTTT
            </>
        )
    }
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
        <div>{renderCurrentSelection(mode)}</div>
        :
        <Loading />
        }
    </div>)
}

export default Main;
