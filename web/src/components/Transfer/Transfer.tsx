import React from 'react';
import TransferHeader from './TransferHeader';
import Receive from './Assets/Receive';
import Send from './Assets/Send';
import Approve from './Assets/Approve';
import './Transfer.css';

interface Props {
    mode: any;
    transaction: any
}

const Transfer =  (props: Props) => {
    const {mode, transaction} = props;
    console.log('[Transfer.tsx]: transaction: ',transaction)

    const getAssetsSendInfo = {
        sendTokens: transaction.out,
        gas: transaction.gas,
        gasPrice: transaction.gasPrice
    }

    const getAssetsReceiveInfo = {
        sendTokens: transaction.in,
    }

    const getAssetsApproveInfo = {
        contractType: 'NFT',
        sendTokens: transaction.approve,
        NFTCategoryName: "",
        gas: 0,
        gasPrice: transaction.gasPrice
    }

    const renderCurrentSelection = (mode: string | null) => {
        switch (mode) {
            case 'transaction-assets-exchange': {
                return (
                    <>
                        <TransferHeader mode={mode}></TransferHeader>
                        <Send {...getAssetsSendInfo} />
                        <Receive {...getAssetsReceiveInfo} />
                    </>
                )
            }
            case 'transaction-assets-approval': {
                return (
                    <>
                        <TransferHeader mode={mode}></TransferHeader>
                        <Send {...getAssetsSendInfo} />
                        <Approve {...getAssetsApproveInfo} />
                    </>
                )
            }
            default: {
                return (
                    <>
                        Not designed.
                    </>
                )
            }
        }
    }

    return (<div>
        {renderCurrentSelection(mode)}
    </div>)
};

export default Transfer;