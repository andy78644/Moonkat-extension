import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import LinkIcon from '@mui/icons-material/OpenInNew';

import './ContractInfo.css'

interface Props {
    mode: string | null,
};

const ContractInfo = (props: Props) => {
    const { mode } = props;

    // mock getBasicInfo API response
    const contractInfo = {
        contractName: 'BAYC',
        contractAddress: '0xcd234a471b72ba2f1ccf0a70fcaba648a5eecd8d',
        contractLink: 'https://www.youtube.com/watch?v=V21wlp5_pAA',
        contractVerification: true
    }
    const { contractName, contractAddress, contractLink, contractVerification} = contractInfo;

    const truncatedAddress = contractAddress.slice(0, 6) + '....' + contractAddress.slice(-4);
    
    return (
        <div id="contractInfo">
            {
                mode === 'asset exchange' ?
                <div id="infoText"> Interacting with <u>{contractName}</u> </div> :
                <div id="infoText"> Giving approval to <u>{contractName}</u> </div>
            }
            <div id="contractText"> Contract &nbsp; ({truncatedAddress})
                <IconButton href={contractLink} target="_blank">
                    <LinkIcon sx={{ fontSize: 16, paddingBottom: 0.3 }}/> 
                </IconButton>
            </div>
        </div>
    )
}

export default ContractInfo;