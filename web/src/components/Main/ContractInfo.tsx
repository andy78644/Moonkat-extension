import React from "react";
import LinkIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import './ContractInfo.css'
import { ForkRight } from "@mui/icons-material";

interface Props {
    close: any,
    pass: any,
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
            </div>
            <div id="address">
                <div id="Buttons">
                </div>
                Contract &nbsp; (0xBC4C...f13D) 
                <IconButton>
                    <LinkIcon sx={{fontSize: 18}}/>
                </IconButton>
                <IconButton onClick={props.close}>
                        <DisabledByDefaultIcon sx={{display: "inline-block"}}/>
                    </IconButton>
                    <IconButton onClick={props.pass}>
                        <CheckCircleOutlineIcon sx={{display: "inline-block"}}/>
                    </IconButton>
            </div>
        </div>
    )
}

export default ContractInfo;