import React from "react";
import LinkIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton'

import './ContractInfo.css'

interface Props {
    productName: any,
    productAddress: any,
    linkToProduct: any,
    verificationState: any
};

const ContractInfo = () => {
    return (
        <div id="contractInfo">
            <div id="infoTitle">BAYC</div>
            <div id="address">
                Contract &nbsp; (0xBC4C...f13D) 
                <IconButton>
                    <LinkIcon sx={{fontSize: 18}}/>
                </IconButton>
            </div>
        </div>
    )
}

export default ContractInfo;