import React, {useState, useEffect} from "react";
import Browser from "webextension-polyfill";
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import CampaignIcon from '@mui/icons-material/Campaign';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import './Header.css'

interface Props {
    tagState: boolean,
    changeTag: any,
    // productType: any;
    // productAction: any;
}

var windowObj: Browser.Windows.Window;

const Header = (props: Props) => {

    const [reportPopOut, setReportPopOut] = useState(false);
    
    useEffect(() => {
        if (reportPopOut) {
            const createReportPopout = async () => {
                const queryString = new URLSearchParams({})
                const width = 300;
                const height = 380;
                const left = 500;
                const top = 500;
                windowObj = await Browser.windows.create({
                    url: `report.html?${queryString}`,
                    type: 'popup',
                    width,
                    height,
                    left,
                    top
                })
            };
            createReportPopout().then(() => {
                Browser.windows.onRemoved.addListener(() => {
                    setReportPopOut(false)
                })
            }).catch(()=> {
                console.log("Fail to create pop out window!")
            });
        }
    }, [reportPopOut]);

    return (
        <div id="header">
            <div id="source">
                NFT · MINTING
            </div>
            <div id="button">
                <IconButton onClick={() => setReportPopOut(true)}>
                    <CampaignIcon sx={{fontSize: 23}} />
                </IconButton> 
                <IconButton onClick={() => props.changeTag(!props.tagState)}>
                    <FormatListBulletedIcon sx={{fontSize: 20}} />
                </IconButton> 
            </div>
        </div>
    )
}

export default Header;