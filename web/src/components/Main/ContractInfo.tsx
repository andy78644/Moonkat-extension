import React from "react";
import IconButton from "@mui/material/IconButton";
import LinkIcon from '@mui/icons-material/OpenInNew';

import './ContractInfo.css'

interface Props {
    mode: string | null,
    contractData: any
};

const ContractInfo = (props: Props) => {
    const { mode, contractData} = props;

    // mock getBasicInfo API response
    const contractInfo = {
        contractName: 'BAYC',
        contractAddress: contractData ?? 'Error',
        contractLink: `https://etherscan.io/address/${contractData}`,
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