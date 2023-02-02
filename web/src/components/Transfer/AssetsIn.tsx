import React from "react";
import IconButton from "@mui/material/IconButton";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SampleImage from '../../assets/sample.jpeg'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './AssetsIn.css'

interface Props {
    // productNumber: any;
    // productName: any;
    // productSource: any;
    asset: any;
    symbol: any;
}

const AssetsIn = (props: Props) => {
    const {asset, symbol} = props
    return (
        <div id="assetsIn">
            <div id="assetsInTitle">
                Assets In
            </div>
            <div id="assetsInContent">
                <IconButton>
                    <SaveAltIcon />
                </IconButton>
                <img id="assetsImage" src={SampleImage} alt="sampleImage" />
                <div id="assetsInAssetsAndSource">
                    <div id="assetsInAssets">{Number(asset).toFixed(4)}{symbol}</div>
                    <br />
                    <div id="assetsInSource">View On OpenSea</div>
                </div>
                <IconButton id="verificationButton">
                    <CheckCircleIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default AssetsIn;