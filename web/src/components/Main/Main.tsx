import React, { useState, useEffect } from "react";
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

    // Close extension
    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, { id, data });
        window.close();
    }
    const accept = () => extensionResponse(true);
    const reject = () => extensionResponse(false);

    switch (mode) {
        case 'transaction-assets-exchange': {
            return (
                <>
                    <MainHeader></MainHeader>
                    <ContractInfo mode={mode}/>
                    <Transfer mode={mode}/>
                    <Footer onAccept={accept} onReject={reject} />
                </>
            )
        }
        case 'transaction-assets-approval': {
            return (
                <>
                    <MainHeader></MainHeader>
                    <ContractInfo mode={mode}/>
                    <Transfer mode={mode}/>
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
                    <ContractInfo mode={mode}/>
                    <Transfer mode={mode}/>
                    <Footer onAccept={accept} onReject={reject} />
                </>
            )
        }
        case 'signature-move-assets': {
            return (
                <>
                    <MainHeader></MainHeader>
                    <ContractInfo mode={mode}/>
                    <Transfer mode={mode}/>
                    <Footer onAccept={accept} onReject={reject} />
                </>
            )
        }
        case 'signature-not-detected': {
            return <div></div>
        }
        default: {
            return <Loading />
        }
    }
}

export default Main;
