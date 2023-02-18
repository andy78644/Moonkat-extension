import React from 'react';
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
    const getAssetsSendInfo = {
        contractType: 'ERC-20',
        sendTokens: {
            'ETH': 
                [
                // token image url
                'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
                // contract url
                'https://www.youtube.com/watch?v=V21wlp5_pAA',
                // asset in/out number
                -68.068, 
                // asset unit
                'ETH', 
                // asset verification state
                true, 
                // asset can be sold on Opensea or not
                true 
                ]
                ,
        },
        NFTCategoryName: '',
        gas: transaction.gas,
        tokenImageURL: transaction.out.tokenURL ?? '',
        amount: transaction.out.amount,
        symbol: transaction.out.symbol
    }

    const getAssetsReceiveInfo = {
        contractType: 'NFT',
        sendTokens: {
            '#2334': ['https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', 'https://www.youtube.com/watch?v=V21wlp5_pAA', 1, 'BAYC', true, true],
            '#2345': ['https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', 'https://www.youtube.com/watch?v=V21wlp5_pAA', 2, 'BAYC', false, true],
        },
        NFTCategoryName: 'Bored Ape Yacht Club',
        gas: 0,
        tokenImageURL: transaction.in.tokenURL ?? '',
        amount: transaction.in.amount,
        symbol: transaction.in.symbol
    }

    const getAssetsApproveInfo = {
        contractType: 'NFT',
        sendTokens: {
            '#2334': ['https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', 'https://www.youtube.com/watch?v=V21wlp5_pAA', 1, 'BAYC', true, true],
            '#2345': ['https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', 'https://www.youtube.com/watch?v=V21wlp5_pAA', 2, 'BAYC', false, true],
        },
        NFTCategoryName: 'Bored Ape Yacht Club',
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