import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import nft from '../../assets/icons8-nft-64.png'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import VerifiedIcon from '@mui/icons-material/Verified';
import Popover from '@mui/material/Popover';

import './AssetsApprove.css';

interface Props {
    contractType: string;
    sendTokens: any;
    NFTCategoryName: string | null;
}

const AssetsApprove = (props: Props) => {
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
                        aria-owns={hover ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        <HelpOutlineIcon sx={{ fontSize: 18 }} />
                    </Typography>
                    <Popover
                        id="mouse-over-popover"
                        sx={{ pointerEvents: 'none' }}
                        open={hover}
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography sx={{ p: 1 }}>I use Popover.</Typography>
                    </Popover>
                    <ListItemText />
                </ListItemButton>
                <hr></hr>
                <ListItem
                    sx={{ padding: "4px 16px" }}
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
                        <IconButton>
                            <VerifiedIcon
                                color={sendTokens.osVerified === true ? "primary" : undefined}
                                sx={{ fontSize: 22, marginBottom: '8px' }}
                            />
                        </IconButton>
                    </div>
                </ListItem>
                <ListItem
                    sx={{
                        paddingBottom: "2px",
                        paddingTop: "0px",
                    }}
                >
                    <img src={sendTokens.tokenURL ?? nft} alt="nft" width="48px" height="48px" />
                    <ListItemText
                        sx={{ fontSize: '20px', textAlign: 'right' }}
                        primary={
                            <div>
                                <Typography
                                    sx={{ display: 'inline-block', fontFamily: 'Lato-thin', fontSize: '20px', fontWeight: 100 }}>
                                    Can withdraw &nbsp;
                                </Typography>
                                <Typography
                                    sx={{ display: 'inline-block', fontFamily: 'Lato', fontSize: '20px', fontWeight: 900 }}>
                                    all {sendTokens.symbol}s
                                </Typography>
                            </div>

                        }
                    />
                </ListItem>
            </List>
        </div>
    )
};

export default AssetsApprove;