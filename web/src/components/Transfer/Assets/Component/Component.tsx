import React, { useState, useEffect } from "react"
import List from '@mui/material/List'
import nft from '../../../../assets/icons8-nft-64.png'

import Header from './Header'
import CollectionName from "./CollectionName"
import GasFee from "./GasFee"
import Assets from "./Assets"

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
    totalToken: number, osVerified: boolean,
    showGasFee: boolean, hasMultipleAssets: boolean,
    tokenLength: number,
}

const defaultTokenInfoType: TokenContextType = {
    sendTokens: [] as any[], gasFee: 0, mode: "",
    verbForPopOverText: "", operator: "",
    tokenURL: "", tokenSymbol: "",
    collectionIconUrl: "", collectionName: "",
    totalToken: 0, osVerified: false,
    showGasFee: false, hasMultipleAssets: false,
    tokenLength: 0,
}

const TokenContext = React.createContext<TokenContextType>(defaultTokenInfoType)

const Component = (props: Props) => {

    // State Variables
    const { sendTokens, gasFee, mode } = props
    const [expand, setExpand] = useState(false)
    const [tokenInfo, setTokenInfo] = useState<TokenContextType>()

    // Handle different mode
    useEffect(() => {

        console.log(`[Component.tsx]: The response for ${mode} is :`, sendTokens)

        const collectionIconUrl = sendTokens[0].collectionIconUrl === "" ? nft : sendTokens[0].collectionIconUrl
        const tokenURL = sendTokens[0].tokenURL === null ? "" : sendTokens[0].tokenURL
        const collectionName = sendTokens[0].collectionName
        const hasMultipleAssets = sendTokens.length > 1
        const osVerified = sendTokens[0].osVerified
        const tokenSymbol = sendTokens[0].symbol

        let totalToken: number = 0
        let verbForPopOverText: string = ""
        let operator: string = ""
        let showGasFee: boolean = false

        sendTokens.map((token: any) => { totalToken = totalToken + parseFloat(token.amount) })

        switch (mode) {
            case "Assets Receive":
                verbForPopOverText = "receive"
                operator = "+"
                break
            case "Assets Send":
                verbForPopOverText = "send"
                operator = "-"
                showGasFee = true
                break
            case "Assets Approve":
                verbForPopOverText = "approve"
                break
            default:
                verbForPopOverText = "wrong"
                operator = "X"
                break
        }

        const info: TokenContextType = {
            sendTokens: sendTokens, gasFee: gasFee, mode: mode,
            verbForPopOverText: verbForPopOverText, operator: operator,
            tokenURL: tokenURL, tokenSymbol: tokenSymbol,
            collectionIconUrl: collectionIconUrl, collectionName: collectionName,
            totalToken: totalToken, osVerified: osVerified,
            showGasFee: showGasFee, hasMultipleAssets: hasMultipleAssets,
            tokenLength: sendTokens.length,
        }

        console.log(`[Component.tsx]: The token info for is : `, info)

        setTokenInfo(info)
    }, [])

    return (
        <TokenContext.Provider value={tokenInfo ?? defaultTokenInfoType}>
            <div id="assetsComponent">
                <List sx={{ width: '100%', bgcolor: '#FFF8EA', borderRadius: 8 }} component="nav">
                    <Header expand={expand} setExpand={setExpand} />
                    <CollectionName />
                    <GasFee />
                    <Assets expand={expand} setExpand={setExpand}/>
                </List>
            </div>
        </TokenContext.Provider>
    )
}

export { Component, TokenContext }