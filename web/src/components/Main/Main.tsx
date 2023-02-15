import React, { useState, useEffect } from "react";
import dataService from "../../dataService";
import Transfer from "../Transfer/Transfer";
import MoreInfo from "../MoreInfo/MoreInfo";
import Browser from "webextension-polyfill";
import contractData from "../../types/contractType";
import ContractInfo from "./ContractInfo";
import Navbar from "./Navbar";

import './Main.css'

interface Props {
    id: any;
    asset: any;
    contract:any;
    spender: any;
    chainId: any;
    name: any;
    symbol: any;
    bypassed: any;
    assetOut: any;
    assetIn: any;
    gas: any;
    outSymbol: any;
    inSymbol:any;
    tokenURL: any;
};

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
    showSection: 'transfer'
}

const Main = (props: Props) => {

    const { id, spender,assetOut, assetIn, gas, outSymbol, inSymbol, tokenURL
    } = props;
    const transferInfo = {
        assetOut: assetOut,
        assetIn: assetIn,
        gas: gas,
        outSymbol: outSymbol,
        inSymbol: inSymbol ,
        tokenURL: tokenURL
    }
    const [contractState, setContract] = useState<contractData>(initContractState);
    const [userState, setUserState] = useState(initUserState);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [verificationState, setVerificationState] = useState(false);


    // Fetch contract data
    useEffect(() => {
        const fetchContract = async () => {
            await dataService.getByAddress(spender)
                .then(res => {
                    setContract(res)
                    setHasLoaded(true)
                })
        }
        fetchContract()
            .catch(e => {
                setContract(initContractState)
                setHasLoaded(true)
            });
    }, [])

    // Close extension
    const extensionResponse = async (data: boolean) => {
        await Browser.runtime.sendMessage(undefined, { id, data });
        window.close();
    }
    const accept = () => extensionResponse(true);
    const reject = () => extensionResponse(false);

    // Change section
    const changeSection = (section: string) => {
        let userState = {
            showSection: section
        }
        setUserState(userState)
    }

    const section = userState.showSection;

    return (
        <div>
            {
                hasLoaded
                    ?
                    <div>
                        <ContractInfo close={reject} pass={accept} contract={props.contract}/>
                        {
                            section === 'transfer'
                                ?
                                <Transfer
                                    {...transferInfo}
                                />
                                :
                                <MoreInfo />
                        }
                        <Navbar
                            section={userState.showSection}
                            onSection={changeSection}
                        />
                    </div>
                    :
                    <div>
                        <h1>Loading ...</h1>
                    </div>
            }
        </div>
    )
}

export default Main;
