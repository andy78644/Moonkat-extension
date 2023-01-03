import React, { useState, useEffect, useCallback } from "react";
import dataService from "../dataService";
import Transfer from "./Transfer/Transfer";
import MoreInfo from "./MoreInfo/MoreInfo";
import Report from "./Report/Report";
import Browser from "webextension-polyfill";
import Button from "./Button";
import contractData from "../types/contractType";

type Props = {
    id: any;
    asset: any;
    spender: any;
    chainId: any;
    name: any;
    symbol: any;
    bypassed: any;
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

    const { id, asset, spender, chainId, name, symbol, bypassed } = props;

    const [contractState, setContract] = useState<contractData>(initContractState);
    const [userState, setUserState] = useState(initUserState);
    const [hasLoaded, setHasLoaded] = useState(false);

    // if (spender === null) return (<div>ERROR: Spender Address === NULL</div>);

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
    const reject = () => extensionResponse(false);

    // Change section
    const changeSection = (section: string) => {
        let userState = {
            showSection: section
        }
        setUserState(userState)
    }
    return (
        <div>
            {
                hasLoaded
                    ?
                    <React.Fragment>
                        {userState.showSection === 'moreInfo' && <MoreInfo />}
                        {userState.showSection === 'report' && <Report nameTag={''} categoryTag={''} featureTag={''} />}
                        {userState.showSection === 'transfer' && <Transfer {...contractState} />}
                        <div className="flex flex-row gap-1 justify-around">
                            <Button onClick={() => changeSection('transfer')}> Transfer </Button>
                            <Button onClick={() => changeSection('report')}> Report </Button>
                            <Button onClick={() => changeSection('moreInfo')}> More Info </Button>
                            <Button onClick={reject}> Reject </Button>
                        </div>
                    </React.Fragment>
                    :
                    <div>
                        <h1>Loading ...</h1>
                    </div>
            }
        </div>
    )
}

export default Main;
