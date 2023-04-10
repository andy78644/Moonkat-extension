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
    tokenURL: string, symbol: string, title: string,
    collectionIconUrl: string, collectionName: string, type: string,
    totalToken: number, osVerified: boolean, tokenLength: number,
    [key: string]: any
}

const defaultTokenInfoType: TokenContextType = {
    sendTokens: [] as any[], gasFee: 0, mode: "",
    verbForPopOverText: "", operator: "",
    tokenURL: nft, symbol: "NFT", title: "unknown",
    collectionIconUrl: nft, collectionName: "NFT Collection", type: "",
    totalToken: 0, osVerified: false, tokenLength: 0,
}

const TokenContext = React.createContext<TokenContextType>(defaultTokenInfoType)

const Component = (props: Props) => {

    // State Variables
    const { sendTokens, gasFee, mode } = props
    const [expand, setExpand] = useState(true)
    const [tokenInfo, setTokenInfo] = useState<TokenContextType>(defaultTokenInfoType)

    // Handle different mode
    useEffect(() => {

        const InfoContainer = JSON.parse(JSON.stringify(defaultTokenInfoType))

        InfoContainer.sendTokens = sendTokens
        InfoContainer.mode = mode
        if (gasFee) InfoContainer.gasFee = gasFee
        // backend
        sendTokens.map((token: any) => {
            for (const [key, value] of Object.entries(token)) {
                if (value) InfoContainer[key] = value
            }
        })
        InfoContainer.tokenLength = sendTokens.length
        sendTokens.map((token: any) => {
            InfoContainer.totalToken = InfoContainer.totalToken + parseFloat(token.amount)
        })
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
                            <Assets expand={expand} />
                            <GasFee />
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