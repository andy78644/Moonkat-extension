import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import GasFeeIcon from '@mui/icons-material/EvStation';

import './AssetsOut.css';

interface Props {
    asset:any;
    symbol:any;
    gas:any
}

const AssetsOut = (props: Props) => {
    const {asset, symbol, gas} = props
    return (
        <div id="assetsOut">
            <div id="assetsOutTitle">
                Assets Out & Gas
            </div>
            <div id="assetsOutAssets">
                <IconButton id="assetsOutIcon">
                    <ArrowOutwardIcon sx={{fontSize: 25}}/>
                </IconButton>
                <div id="assetsOutAssetsFee">
                    {Number(asset)}&nbsp;{symbol}
                </div>
            </div>
            <div id="assetsOutGas">
                <IconButton id="assetsOutGasFeeIcon">
                    <GasFeeIcon sx={{fontSize: 25}}/>
                </IconButton>
                <div id="assetsOutGasFee">
                    {Number(gas)}&nbsp;Wei
                </div>
            </div>
        </div>
    );
}

export default AssetsOut;