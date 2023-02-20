import React,{useState, useEffect} from 'react';
import TransferHeader from './TransferHeader';
import AssetsIn from './AssetsIn';
import AssetsOut from './AssetsOut';
import AssetsApprove from './AssetsApprove';
import './Transfer.css';

interface Props {
    mode: any;
    transaction: any
}

const Transfer =  (props: Props) => {
    const {mode, transaction} = props;
    console.log('transaction: ',transaction)
    const [renderMode, setRenderMode] = useState('')
    const getAssetsSendInfo = {
        contractType: 'ERC-20',
        //todo: multiple asset
        sendTokens: [
            //{
            //     amount: ,
            //     type: 'NATIVE/ERC20/ERC1155',
            //     symbol: 'ETH',
            //     tokenURL: 'https://static.alchemyapi.io/images/network-assets/eth.png',
            //     osVerified: ''
            //     
            // }
            transaction.out
        ],
        NFTCategoryName: '',
        gas: transaction.gas,
    }

    const getAssetsReceiveInfo = {
        contractType: 'NFT',
        sendTokens: [
            //{
            //     amount: ,
            //     type: 'NATIVE/ERC20/ERC1155',
            //     symbol: 'ETH',
            //     tokenURL: 'https://static.alchemyapi.io/images/network-assets/eth.png',
            //     osVerified: ''
            //     
            // }
            transaction.in
        ],
        NFTCategoryName: "",
        gas: 0,
    }

    const getAssetsApproveInfo = {
        contractType: 'NFT',
        sendTokens: [
            transaction.approve
        ],
        NFTCategoryName: "",
        gas: 0,
    }

    const renderCurrentSelection = (mode: string | null) => {
        switch (mode) {
            case 'transaction-assets-exchange': {
                return (
                    <>
                        <TransferHeader mode={mode}></TransferHeader>
                        <AssetsOut {...getAssetsSendInfo} />
                        <AssetsIn {...getAssetsReceiveInfo} />
                    </>
                )
            }
            case 'transaction-assets-approval': {
                return (
                    <>
                        <TransferHeader mode={mode}></TransferHeader>
                        <AssetsOut {...getAssetsSendInfo} />
                        <AssetsApprove {...getAssetsApproveInfo} />
                    </>
                )
            }
            case 'signature-token-approval': {
                return (
                    <>
                        <TransferHeader mode={mode}></TransferHeader>
                        <AssetsApprove {...getAssetsApproveInfo} />
                    </>
                )
            }
            case 'signature-move-assets': {
                return (
                    <>
                        <TransferHeader mode={mode}></TransferHeader>
                        <AssetsOut {...getAssetsSendInfo} />
                    </>
                )
            }
            case 'signature-not-detected': {
                return (
                    <>
                        Not designed.
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