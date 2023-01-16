import React from "react";
import DiamondIcon from '@mui/icons-material/Diamond';
import GroupsIcon from '@mui/icons-material/Groups';
import RestoreIcon from '@mui/icons-material/Restore';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import './Info.css'
import { Groups } from "@mui/icons-material";

interface Props {
    infoName: any,
    infoIcon: any,
    infoContent: any,
}

const IconName: any[] = [
    ['Diamond', <DiamondIcon />], 
    ['Groups' , <GroupsIcon />],
    ['Restore', <RestoreIcon />],
    ['CompareArrows', <CompareArrowsIcon />],
    ['AccessTime', <AccessTimeIcon />],
    ['AttachMoney', <AttachMoneyIcon />],
]

const Info = (props: Props) => {
    return (
        <div id="info">
            <div>
                {props.infoName}
            </div>
            <div id="infoContent">
                {
                    IconName.find(e => e[0] == props.infoIcon)[1]
                }
                &emsp;
                {props.infoContent}
            </div>
        </div>
    )
}

export default Info;