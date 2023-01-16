import React from "react";
import Info from "./Info";

import './Token.css'

interface Props {

}

const Token = () => {
    return (
        <div id="token">
            <Info infoName="Token Type" infoIcon="Paid" infoContent="ERC-721"/>
            <Info infoName="Holders" infoIcon="Groups" infoContent="6186"/>
            <Info infoName="Create Time" infoIcon="Restore" infoContent="619 Days ago"/>
            <Info infoName="Total Transactions" infoIcon="CompareArrows" infoContent="112,718"/>
            <Info infoName="Last Transaction Time" infoIcon="AccessTime" infoContent="2 Hours ago"/>
        </div>
    )
}

export default Token;