import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import GasFeeIcon from '@mui/icons-material/EvStation';

import './AssetsOut.css';

interface Props {
    assetOut: any;
    gasFee: any;
}

const AssetsOut = () => {
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
                    0.2 ETH
                </div>
            </div>
            <div id="assetsOutGas">
                <IconButton id="assetsOutGasFeeIcon">
                    <GasFeeIcon sx={{fontSize: 25}}/>
                </IconButton>
                <div id="assetsOutGasFee">
                    0.0028 ETH
                </div>
            </div>
        </div>
    );
}

export default AssetsOut;