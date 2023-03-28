import React, { useState, useEffect } from "react"
import List from '@mui/material/List'
import nft from '../../../../assets/icons8-nft-64.png'

import Header from './Header'
import CollectionName from "./CollectionName"
import GasFee from "./GasFee"
import Assets from "./Assets"
import Withdraw from "./Withdraw"

import './Component.css'

interface Props {
    sendTokens: Array<any>
    gasFee: number
    mode: string
}

interface TokenContextType {
    sendTokens: any[], gasFee: number, mode: string,
    verbForPopOverText: string, operator: string,
    tokenURL: string, tokenSymbol: string,
    collectionIconUrl: string, collectionName: string,
    totalToken: number, osVerified: boolean, tokenLength: number,
}

const defaultTokenInfoType: TokenContextType = {
    sendTokens: [] as any[], gasFee: 0, mode: "",
    verbForPopOverText: "", operator: "",
    tokenURL: "", tokenSymbol: "",
    collectionIconUrl: nft, collectionName: "",
    totalToken: 0, osVerified: false, tokenLength: 0,
}

const TokenContext = React.createContext<TokenContextType>(defaultTokenInfoType)

const Component = (props: Props) => {

    // State Variables
    const { sendTokens, gasFee, mode } = props
    const [expand, setExpand] = useState(false)
    const [tokenInfo, setTokenInfo] = useState<TokenContextType>(defaultTokenInfoType)

    // Handle different mode
    useEffect(() => {

        console.log(`[Component.tsx]: The response for ${mode} is :`, sendTokens)

        const InfoContainer = Object.assign({}, defaultTokenInfoType);

        InfoContainer.sendTokens = sendTokens
        InfoContainer.mode = mode
        InfoContainer.gasFee = gasFee

        // not empty
        if (sendTokens[0]) {
            if (sendTokens[0].tokenURL && sendTokens[0].tokenURL !== "") 
                InfoContainer.tokenURL = sendTokens[0].tokenURL
            InfoContainer.tokenSymbol = sendTokens[0].symbol
            if (sendTokens[0].collectionIconUrl && sendTokens[0].collectionIconUrl !== "") 
                InfoContainer.collectionIconUrl = sendTokens[0].collectionIconUrl
            if (sendTokens[0].collectionName && sendTokens[0].collectionName !== "") 
                InfoContainer.collectionName = sendTokens[0].collectionName
            InfoContainer.totalToken = sendTokens[0].totalToken
            InfoContainer.osVerified = sendTokens[0].osVerified
            InfoContainer.tokenLength = sendTokens.length
            InfoContainer.totalToken = 0 // implicit mark totalToken to number type
            sendTokens.map((token: any) => { 
                InfoContainer.totalToken =  InfoContainer.totalToken + parseFloat(token.amount) 
            })
        }

        switch (mode) {
            case "Assets Receive":
                InfoContainer.verbForPopOverText = "receive"
                InfoContainer.operator = "+"
                break
            case "Assets Send":
                InfoContainer.verbForPopOverText = "send"
                InfoContainer.operator = "-"
                break
            case "Assets Approve":
                InfoContainer.verbForPopOverText = "approve"
                break
            default:
                InfoContainer.verbForPopOverText = "wrong"
                InfoContainer.operator = "X"
                break
        }

        console.log(`[Component.tsx]: The token info for ${InfoContainer.mode} is : `, InfoContainer)

        setTokenInfo(InfoContainer)
    }, [])

    switch (mode) {
        case "Assets Receive":
            return (
                <TokenContext.Provider value={tokenInfo}>
                    <div id="assetsComponent">
                        <List sx={{ width: '100%', bgcolor: '#FFF8EA', borderRadius: 8 }} component="nav">
                            <Header expand={expand} setExpand={setExpand} />
                            <CollectionName />
                            <Assets expand={expand} />
                        </List>
                    </div>
                </TokenContext.Provider>
            )
        case "Assets Send":
            return (
                <TokenContext.Provider value={tokenInfo}>
                    <div id="assetsComponent">
                        <List sx={{ width: '100%', bgcolor: '#FFF8EA', borderRadius: 8 }} component="nav">
                            <Header expand={expand} setExpand={setExpand} />
                            <CollectionName />
                            <GasFee />
                            <Assets expand={expand} />
                        </List>
                    </div>
                </TokenContext.Provider>
            )
        case "Assets Approve":
            return (
                <>
                    <TokenContext.Provider value={tokenInfo}>
                        <div id="assetsComponent">
                            <List sx={{ width: '100%', bgcolor: '#FFF8EA', borderRadius: 8 }} component="nav">
                                <Header expand={expand} setExpand={setExpand} />
                                <CollectionName />
                                <Withdraw />
                            </List>
                        </div>
                    </TokenContext.Provider>
                </>
            )
        default:
            return (
                <></>
            )
    }
}

export { Component, TokenContext }