import React from "react"

import Header from './Component/Header'
import CollectionName from "./Component/CollectionName"
import Withdraw from "./Component/Withdraw"

import List from '@mui/material/List'

import { defaultAssetsValue } from "./DefaultValue"


interface Props {
    assetsApprove: any
}

const theme = {
    color: "#B8463D",
    mode: "Assets Approve",
    verbForPopOver: "approve",
}

// const antiCollectionNameList: Array<string> = ["ERC20", "NATIVE"]

const Approve = (props: Props) => {
    const { assetsApprove } = props
    return (
        <>
            <div className="assetsComponent">
                <List sx={{ width: '100%', bgcolor: '#FFF8EA', borderRadius: 8 }} component="nav">
                    <Header
                        mode={theme.mode}
                        defaultExpand={false}
                        expand={false}
                        setExpand={() => { }}
                        verbForPopOver={theme.verbForPopOver}
                    />
                    <CollectionName
                        osVerified={assetsApprove.osVerified ?? defaultAssetsValue.osVerified}
                        collectionName={assetsApprove.collectionName ?? defaultAssetsValue.collectionName}
                    />
                    <Withdraw
                        color={theme.color}
                        symbol={assetsApprove.symbol ?? defaultAssetsValue.symbol}
                        imgURL={assetsApprove.collectionIconUrl ?? defaultAssetsValue.collectionIconUrl}
                    />
                </List>
            </div>
        </>
    )
};

export default Approve;