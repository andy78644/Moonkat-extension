import React, { useState, useEffect } from "react"

import Header from './Component/Header'
import CollectionName from "./Component/CollectionName"
import Assets from "./Component/Assets"
import GasFee from "./Component/GasFee"

import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse';

import './Component.css'
import { defaultAssetsValue } from "./DefaultValue"

interface Props {
    gas: string
    mode: string
    assetsOut: any
    gasPrice: string
}

const theme = {
    operator: '-',
    color: "#B8463D",
    mode: "Assets Send",
    verbForPopOver: "send",
}

const antiCollectionNameList: Array<string> = ["ERC20", "NATIVE"]

const Out = (props: Props) => {
    const { mode, assetsOut, gas, gasPrice } = props
    const gasFee = parseInt(gas, 16) * parseInt(gasPrice) * 10 ** (-9)
    const [expand, setExpand] = useState(true)
    const [assets, setAssets] = useState<any>()

    const displayAmount = (numString: string): number => {
        const num: number = parseFloat(numString)
        if (num > 99) return Number(num.toFixed(2))
        else if (0.0001 < num && num <= 99) return Number(num.toFixed(4))
        else if (0 < num && num < 0.0001) return 0.0001
        else return num
    }

    const displayOperator = (amount: string) => {
        if (parseFloat(amount) < 0.0001) return '<'
        else return theme.operator
    }

    const displayExpandIcon = () => {
        if (!assetsOut) return false
        for (const [addressName, multipleAssets] of Object.entries<any[]>(assetsOut)) {
            if (itNeedToBeCollapsed(multipleAssets)) return true
        }
        return false
    }

    const displayGasfee = () => {
        if (mode.split('-')[0] === "transaction") return true;
        else return false
    }

    const itNeedToBeCollapsed = (assets: any) => {
        let collapsed: boolean = false
        const tokenId: string = assets[0].tokenId
        if (!tokenId) return collapsed
        assets.map((token: any, index: number) => {
            if (token.tokenId != tokenId)
                collapsed = true
        })
        return collapsed
    }

    useEffect(() => {
        let assetsList: any = []
        if (assetsOut) {
            for (const [addressName, multipleAssets] of Object.entries<any[]>(assetsOut)) {
                let totalAmount: number = 0
                let collapseAssetsList: any = []
                let defaultToken: any = multipleAssets[0]
                if (!antiCollectionNameList.includes(defaultToken.type)) {
                    assetsList.push(<div key={addressName}>
                        <CollectionName
                            osVerified={defaultToken.osVerified ?? defaultAssetsValue.osVerified}
                            collectionName={defaultToken.collectionName ?? defaultAssetsValue.collectionName}
                        />
                    </div>)
                }
                if (itNeedToBeCollapsed(multipleAssets)) {
                    multipleAssets.map((token: any, index: number) => {
                        collapseAssetsList.push(
                            <Collapse key={addressName + index} in={expand} timeout="auto" unmountOnExit>
                                {collapseAssets(addressName + index, token)}
                            </Collapse>
                        )
                        totalAmount += parseFloat(token.amount)
                    })
                } else {
                    multipleAssets.map((token: any, index: number) => {
                        collapseAssetsList.push(
                            <div key={addressName + index}>
                                {collapseAssets(addressName + index, token)}
                            </div>
                        )
                        totalAmount += parseFloat(token.amount)
                    })
                }
                if (itNeedToBeCollapsed(multipleAssets)) {
                    assetsList.push(
                        <Collapse key={addressName + multipleAssets.length} in={!expand} timeout="auto" unmountOnExit>
                            <Assets
                                title={defaultToken.title ?? defaultAssetsValue.title}
                                tokenId={defaultToken.tokenId ?? defaultAssetsValue.tokenId}
                                amount={displayAmount(totalAmount.toString()) ?? defaultAssetsValue.amount}
                                symbol={defaultToken.symbol ?? defaultAssetsValue.symbol}
                                imgURL={defaultToken.collectionIconUrl ?? defaultAssetsValue.collectionIconUrl}
                                tokenURL={defaultToken.tokenURL ?? defaultAssetsValue.tokenURL}
                                color={theme.color} operator={displayOperator(totalAmount.toString())}
                            />
                        </Collapse>
                    )
                }
                assetsList.push(collapseAssetsList)
            }
        }
        if (displayGasfee()) {
            assetsList.push(
                <GasFee key={"gasFee"} operator={theme.operator} gasFee={displayAmount(gasFee.toString())}
                />
            )
        }
        setAssets(assetsList)
    }, [assetsOut, expand])

    const collapseAssets = (key: string, token: any) => {
        let expandAssetsList: any = []
        expandAssetsList.push(<div key={key}>
            <Assets
                title={token.title ?? defaultAssetsValue.title}
                tokenId={token.tokenId ?? defaultAssetsValue.tokenId}
                amount={displayAmount(token.amount) ?? defaultAssetsValue.amount}
                symbol={token.symbol ?? defaultAssetsValue.symbol}
                imgURL={token.imgURL ?? defaultAssetsValue.imgURL}
                tokenURL={token.tokenURL ?? defaultAssetsValue.tokenURL}
                color={theme.color} operator={displayOperator(token.amount)}
            />
        </div>)
        return expandAssetsList
    }

    return (
        <>
            <div className="assetsComponent">
                <List sx={{ width: '100%', bgcolor: '#FFF8EA', borderRadius: 8 }} component="nav">
                    <Header
                        mode={theme.mode}
                        defaultExpand={displayExpandIcon()}
                        expand={expand}
                        setExpand={setExpand}
                        verbForPopOver={theme.verbForPopOver}
                    />
                    {assets}
                </List>
            </div>
        </>
    )
}

export default Out