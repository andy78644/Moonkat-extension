import React from 'react';
import TransferHeader from './TransferHeader';
import Change from './Assets/Change'
import Approve from './Assets/Approve';
import './Transfer.css';

interface Props {
    mode: any;
    transaction: any
}

const Transfer =  (props: Props) => {
    const {mode, transaction} = props;

    const getAssetsChangeInfo = {
        assetsIn: transaction.in,
        assetsOut: transaction.out,
        gas: transaction.gas,
        gasPrice: transaction.gasPrice
    }

    const getAssetsApproveInfo = {
        assetsApprove: [transaction.approve], // backend pass an object (should be an array)
        assetsOut: transaction.out,
        gas: transaction.gas,
        gasPrice: transaction.gasPrice
    }

    const getSignatureInfo = {
        assetsIn: transaction.in,
        assetsOut: transaction.out,
        gas: transaction.gas,
        gasPrice: transaction.gasPrice
    }

    const renderCurrentSelection = (mode: string | null) => {
        switch (mode) {
            case 'transaction-assets-exchange': {
                return (
                    <>
                        <TransferHeader mode={mode}></TransferHeader>
                        <Change {...getAssetsChangeInfo}/>
                    </>
                )
            }
            case 'transaction-assets-approval': {
                return (
                    <>
                        <TransferHeader mode={mode}></TransferHeader>
                        <Approve {...getAssetsApproveInfo} />
                    </>
                )
            }
            case 'signature-712': {
                return (
                    <>
                        <TransferHeader mode={mode}></TransferHeader>
                        <Change {...getSignatureInfo} />
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