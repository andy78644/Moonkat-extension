import React from "react";
import Info from "./Info";
import DiamondIcon from '@mui/icons-material/Diamond';

import './Creator.css'

interface Props {

}

const Creator = () => {
    return (
        <div id="creator">
            <Info infoName="Contract Creator" infoIcon="Diamond" infoContent="0xaBA71...4D03"/>
            <Info infoName="Balance" infoIcon="AttachMoney" infoContent="23.81 ETH"/>
            <Info infoName="Create Time" infoIcon="Restore" infoContent="620 Days ago"/>
            <Info infoName="Total Transactions" infoIcon="CompareArrows" infoContent="277"/>
            <Info infoName="Last Transaction Time" infoIcon="AccessTime" infoContent="129 Days ago"/>
        </div>
    )
}

export default Creator;