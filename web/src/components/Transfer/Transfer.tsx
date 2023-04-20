import React from 'react'
import In from './Assets/In'
import Out from './Assets/Out'
import Approve from './Assets/Approve'
import TransferHeader from './TransferHeader'
import { mockAssetsIn, nonCollapseAssetsIn, mockAssetsOut, nonCollapseAssetsOut } from './Assets/mockAssets'

interface Props {
    mode: any;
    transaction: any
}

const Transfer =  (props: Props) => {

    const {mode, transaction} = props;
    let {out, approve, gas, gasPrice} = transaction

    // mock data
    // transaction.in = mockAssetsIn
    // out = mockAssetsOut

    return (
        <>
            <TransferHeader mode={mode}></TransferHeader>
            {out || gas ? <Out mode={mode} assetsOut={out} gas={gas} gasPrice={gasPrice}/> : null}
            {transaction.in ? <In assetsIn={transaction.in}/> : null}
            {approve ? <Approve assetsApprove={approve}/> : null}
        </>
    )
};

export default Transfer;