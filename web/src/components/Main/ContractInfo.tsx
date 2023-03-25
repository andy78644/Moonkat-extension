import React from "react";
import IconButton from "@mui/material/IconButton";
import LinkIcon from '@mui/icons-material/OpenInNew';
import VerifiedIcon from '@mui/icons-material/Verified';

import './ContractInfo.css'

interface Props {
    mode: string | null,
    transaction: any
};

const ContractInfo = (props: Props) => {
    const { mode, transaction } = props;
    let contractAddress = ''
    if(mode === 'transaction-assets-exchange') { contractAddress = transaction }
    else  { contractAddress = transaction.approve.contractAddress}
    
    const contractInfo = {
        contractName: undefined,
        contractLink: `https://etherscan.io/address/${contractAddress}`,
        contractVerification: false
    }
    const { contractName, contractLink, contractVerification } = contractInfo;

    const truncatedAddress = contractAddress.slice(0, 6) + '....' + contractAddress.slice(-4);

    return (
        <div id="contractInfo">
            {
                mode === 'transaction-assets-exchange' ?
                    <div id="infoText">
                        Interacting with <u>{contractName ?? ''}</u> &nbsp;
                        <IconButton>
                            {
                                contractVerification ?
                                    <VerifiedIcon color="primary" sx={{ fontSize: 25, paddingBottom: 0.5 }} /> :
                                    <div></div>
                            }
                        </IconButton>
                    </div> :
                    <div id="infoText">
                        Giving approval to <u>{contractName ?? ''}</u> &nbsp;
                        <IconButton sx={{ fontSize: 20, padding: 0 }}>
                            {
                                contractVerification ?
                                    <VerifiedIcon color="primary" sx={{ fontSize: 25, paddingBottom: 0.5 }}/> :
                                    <div></div>
                            }
                        </IconButton>
                    </div>
            }
            <div id="contractText"> Contract（{truncatedAddress}）
                <IconButton sx={{ padding: 0 }} href={contractLink} target="_blank">
                    <LinkIcon sx={{ fontSize: 20, paddingBottom: '3px' }} />
                </IconButton>
            </div>
        </div>
    )
}

export default ContractInfo;