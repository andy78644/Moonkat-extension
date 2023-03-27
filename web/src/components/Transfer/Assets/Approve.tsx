import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import nft from '../../../assets/icons8-nft-64.png'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import VerifiedIcon from '@mui/icons-material/Verified';
import Popover from '@mui/material/Popover';

import './Approve.css';

interface Props {
    sendTokens: any;
}

const Approve = (props: Props) => {
    const { sendTokens } = props
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const hover = Boolean(anchorEl);

    return (
        <div id="assetsApprove">
            <List sx={{ width: '100%', bgcolor: '#FFF8EA', borderRadius: 8 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton sx={{ width: '100%', "&:hover, &.Mui-focusVisible": { backgroundColor: '#FFF8EA' } }}
                    component="div"
                    id="assetsApproveTitle"
                    onClick={handleClick}
                    disableRipple
                >
                    Assets Approve &nbsp;
                    <Typography
                        aria-owns={hover ? 'assetsApprovePopOver' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        <HelpOutlineIcon sx={{ fontSize: 18 }} />
                    </Typography>
                    <Popover
                        id="assetsApprovePopOver"
                        sx={{ pointerEvents: 'none' }}
                        open={hover}
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography sx={{ p: 1 }}>The assets can be withdraw by others.</Typography>
                    </Popover>
                    <ListItemText />
                </ListItemButton>
                <hr></hr>
                <ListItem
                    sx={{ padding: "8px 16px" }}
                >
                    <div>
                        <ListItemText
                            sx={{ display: 'inline-block', fontSize: '20px' }}
                            primary={
                                <Typography
                                    sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                    {sendTokens.collectionName}
                                </Typography>
                            }
                        />
                        {
                            sendTokens.osVerified === true ?
                                <VerifiedIcon
                                    color="primary"
                                    sx={{ fontSize: 22, marginBottom: '8px' }}
                                /> :
                                <div></div>
                        }
                    </div>
                </ListItem>
                <ListItem sx={{ padding: "8px 16px" }}>
                    <img src={sendTokens.tokenURL ?? nft} alt="nft" width="48px" height="48px" />
                    <ListItemText
                        sx={{ paddingLeft: '8px', textAlign: 'right' }}
                        primary={
                            <div>
                                <Typography
                                    sx={{ lineHeight: '100%', display: 'inline-block', fontFamily: 'Lato', fontSize: '20px', fontWeight: 500, color:'#B8463D'}}>
                                    Can withdraw &nbsp;
                                </Typography>
                                <Typography
                                    sx={{ lineHeight: '100%',  display: 'inline-block', fontFamily: 'Lato-bold', fontSize: '20px', fontWeight: 900, color:'#B8463D'}}>
                                    ALL {sendTokens.symbol}s
                                </Typography>
                            </div>

                        }
                    />
                </ListItem>
            </List>
        </div>
    )
};

export default Approve;