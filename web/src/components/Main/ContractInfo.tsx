import React from "react";
import IconButton from "@mui/material/IconButton";
import LinkIcon from '@mui/icons-material/OpenInNew';
import VerifiedIcon from '@mui/icons-material/Verified';

import './ContractInfo.css'

interface Props {
    mode: string | null,
    address: any
};

const ContractInfo = (props: Props) => {
    const { mode, address } = props;

    // mock getBasicInfo API response
    const contractInfo = {
        contractName: "Contract",
        contractAddress: address ?? 'Error',
        contractLink: `https://etherscan.io/address/${address}`,
        contractVerification: true
    }
    const { contractName, contractAddress, contractLink, contractVerification } = contractInfo;

    const truncatedAddress = contractAddress.slice(0, 6) + '....' + contractAddress.slice(-4);

    return (
        <div id="contractInfo">
            {
                mode === 'asset exchange' ?
                    <div id="infoText">
                        Interacting with <u>{contractName ?? ''}</u> &nbsp;
                        <IconButton href={contractLink} target="_blank">
                            {
                                contractVerification ?
                                    <VerifiedIcon color="primary" sx={{ fontSize: 25, paddingBottom: 0.5 }} /> :
                                    <div></div>
                            }
                        </IconButton>
                    </div> :
                    <div id="infoText">
                        Giving approval to <u>{contractName ?? ''}</u> &nbsp;
                        <IconButton href={contractLink} target="_blank" sx={{ fontSize: 20, padding: 0 }}>
                            {
                                contractVerification ?
                                    <VerifiedIcon color="primary" sx={{ fontSize: 25, paddingBottom: 0.5 }}/> :
                                    <div></div>
                            }
                        </IconButton>
                    </div>
            }
            <div id="contractText"> Contract &nbsp; ({truncatedAddress})
                <IconButton href={contractLink} target="_blank">
                    <LinkIcon sx={{ fontSize: 18, paddingBottom: 0.3 }} />
                </IconButton>
            </div>
        </div>
    )
}

export default ContractInfo;