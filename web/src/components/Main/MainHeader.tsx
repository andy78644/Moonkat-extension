import React from 'react';
import Logo from '../../assets/logo.png';
import Union from '../../assets/Union.png';
import Feedback from '../../assets/feedback.png';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Browser from 'webextension-polyfill';
import extensionGTM from '../../gtm/test';

import './MainHeader.css';

interface Props {
    contractAddress: any;
    userAddress: string | null
}

const MainHeader = (props: Props) => {

    const { contractAddress, userAddress } = props;

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
            const queryString = new URLSearchParams({
                contractAddress: contractAddress ?? 'Error',
                userAddress: userAddress ?? 'Error',
            }).toString();
            const width = 400;
            const height = 700;
            const left = window.left! + Math.round((window.width! - width) * 0.5);
            const top = window.top! + Math.round((window.height! - height) * 0.2);

            await extensionGTM.postEvent();

            await Browser.windows.create({
                url: `report.html?${queryString}`,
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
            <a href="https://moonkats.webflow.io/" target="_blank"><img id="logo" src={Logo} alt="logo" /></a>
            <a href="https://moonkats.webflow.io/" target="_blank"><div id="brandName"> MoonKat </div></a>
            <div id="menu">
                <IconButton onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Popover
                    className="assetsInPopOver"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    <Button
                        sx={{ "&:hover": { backgroundColor: '#DFD8CA' }, fontFamily: 'Kiona', fontWeight: 300, fontSize: "20px", color: "#434343", paddingLeft: '16px', paddingRight: '19.85px'  }}
                        startIcon={<img style={{marginRight: '8px'}} src={Union} alt="union" />}
                        onClick={handleReportPopOut}
                    >
                         Report &nbsp;
                    </Button>
                    <br />
                    <hr className='mainHeaderHorizontalLine'></hr>
                    <Button
                        sx={{ "&:hover": { backgroundColor: '#DFD8CA' }, fontFamily: 'Kiona', fontWeight: 300, fontSize: "20px", color: "#434343", paddingLeft: '16px', paddingRight: '8px' }}
                        href={"https://tally.so/r/w4QLG5"}
                        target={'_blank'}
                        startIcon={<img style={{marginRight: '8px'}} src={Feedback} alt="feedback" width="20px" height="20px" />}
                    >
                         Feedback
                    </Button>
                </Popover>
            </div>
        </div >
    )
};

export default MainHeader;