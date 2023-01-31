import React from "react";
import LinkIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import './ContractInfo.css'
import { ForkRight } from "@mui/icons-material";

interface Props {
    close: any,
    // productName: any,
    // productAddress: any,
    // linkToProduct: any,
    // verificationState: any
};

const ContractInfo = (props: Props) => {
    return (
        <div id="contractInfo">
            <div id="infoTitle">
                BAYC
                <div id="closeButton">
                    <IconButton onClick={props.close}>
                        <DisabledByDefaultIcon sx={{display: "inline-block"}}/>
                    </IconButton>
                </div>
            </div>
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