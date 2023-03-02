import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import Union from '../../assets/Union.png';
import Setting from '../../assets/setting.png';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Browser from 'webextension-polyfill';

import './MainHeader.css';
import { color } from '@mui/system';

const MainHeader = () => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleReportPopOut = () => {
        Promise.all([
            Browser.windows.getCurrent(),
        ]).then(async ([window]) => {
            const width = 360;
            const height = 600;
            const left = window.left! + Math.round((window.width! - width) * 0.5);
            const top = window.top! + Math.round((window.height! - height) * 0.2);
        
            await Browser.windows.create({
              url: `report.html`,
              type: 'popup',
              width: width,
              height: height,
              left: left + width,
              top: top
            });
          })
          return true;
    }

    return (
        <div id="mainHeader">
            <img id="logo" src={Logo} alt="logo" />
            <div id="brandName"> MoonKat </div>
            <div id="menu">
                <IconButton onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Popover
                    classes={{ paper: "MuiPopover-paper" }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Button
                        sx={{
                            fontFamily: 'Kiona',
                            fontWeight: 300,
                            fontSize: "20px",
                            color: "#434343",
                            px: '13px'
                        }}
                        startIcon={<img src={Union} alt="union" />}
                        onClick={handleReportPopOut}
                    >
                        &nbsp; Report &nbsp;
                    </Button>
                    <br />
                    <Button
                        sx={{
                            fontFamily: 'Kiona',
                            fontWeight: 300,
                            fontSize: "20px",
                            color: "#434343",
                            paddingLeft: '13px',
                            paddingRight: '18px',
                        }}
                        startIcon={<img src={Setting} alt="setting" />}
                    >
                        &nbsp; Setting
                    </Button>
                </Popover>
            </div>
        </div >
    )
};

export default MainHeader;