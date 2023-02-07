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
    contract: any,
    // productName: any,
    // productAddress: any,
    // linkToProduct: any,
    // verificationState: any
};

const ContractInfo = (props: Props) => {
    const url = `https://etherscan.io/address/${props.contract}`
    const _style = {
        // text-overflow: 'ellipsis'
    }
    return (
        <div id="contractInfo">
            <div id="infoTitle">
                BAYC
            </div>
            <div id="address">
                <div id="Buttons">
                </div>
                <div style={_style}>
                Contract &nbsp;{props.contract}
                </div>
                <IconButton href={url} target="_blank">
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