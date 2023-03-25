import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import nft from '../../assets/icons8-nft-64.png'
import Collapse from '@mui/material/Collapse';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import VerifiedIcon from '@mui/icons-material/Verified';
import Popover from '@mui/material/Popover';

import './AssetsIn.css'

interface Props {
    contractType: string;
    sendTokens: Array<any>;
    NFTCategoryName: string | null;
    gas: any;
}

const AssetsIn = (props: Props) => {
    const { sendTokens } = props
    const [open, setOpen] = React.useState(false);
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
    const renderList = () => {
        return sendTokens.map((token: any) => {
            if (token) {
                return (
                    <ListItem key={token.tokenId}>
                        <img src={token.tokenURL ?? nft} height="48px" width="48px" alt="Asset In" />
                        <ListItemText sx={{ paddingLeft: '8px' }}
                            primary={
                                <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                    {token.title ?? '-'}
                                </Typography>
                            }
                        />
                        <ListItemText sx={{ textAlign: 'right', color: '#509A57' }}
                            primary={
                                <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                    +{token.amount} {token.symbol}
                                </Typography>
                            }
                        />
                    </ListItem>
                )
            }
        });
    }
    return (
        <div id="assetsIn">
            <List
                sx={{ width: '100%', bgcolor: '#FFF8EA', borderRadius: 8 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton
                    sx={{ width: '100%', "&:hover, &.Mui-focusVisible": { backgroundColor: '#FFF8EA' } }}
                    component="div"
                    id="assetsOutTitle"
                    onClick={handleClick}
                    disableRipple
                >
                    Assets Receive &nbsp;
                    <Typography
                        aria-owns={hover ? 'assetsInPopOver' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        <HelpOutlineIcon sx={{ fontSize: 18 }} />
                    </Typography>
                    <Popover
                        id="assetsInPopOver"
                        sx={{ pointerEvents: 'none' }}
                        open={hover}
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <Typography sx={{ p: 1 }}>The assets will receive after confirm this txn.</Typography>
                    </Popover>
                    <ListItemText />
                    {
                        sendTokens.length > 1 ?
                            open ? <ExpandLess sx={{ fontSize: '20px' }} /> : <ExpandMore sx={{ fontSize: '20px' }} /> :
                            <div></div>
                    }
                </ListItemButton>
                <hr></hr>
                <ListItem sx={{ padding: "8px 16px" }}>
                    {/* <div> */}
                    <ListItemText sx={{ display: 'inline-block' }}
                        primary={
                            <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100, lineHeight: '100%' }}>
                                {sendTokens[0].collectionName ?? ''}
                            </Typography>
                        }
                    />
                    {
                        sendTokens[0].osVerified === 'verified' ?
                            <VerifiedIcon
                                color="primary"
                                sx={{ fontSize: 22, marginBottom: '8px' }}
                            /> :
                            <div></div>
                    }
                    {/* </div> */}
                </ListItem>
                {
                    sendTokens.length === 1 ?
                        <ListItem>
                            <img src={sendTokens[0].tokenURL ?? nft} height="48px" width="48px" alt="Tokens" />
                            <ListItemText sx={{ fontSize: '20px', paddingLeft: '8px'}}
                                primary={
                                    <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                        {sendTokens[0].title ?? '-'}
                                    </Typography>
                                }
                            />
                            <ListItemText sx={{ fontSize: '20px', textAlign: 'right', color: '#509A57' }}
                                primary={
                                    <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                        +{sendTokens[0].amount ?? '-'} {sendTokens[0].symbol ?? ''}
                                    </Typography>
                                }
                            />
                        </ListItem> :
                        open ?
                            <ListItem>
                                <img src={sendTokens[0].collectionIconUrl ?? nft} height="48px" width="48px" alt="Tokens" />
                                <ListItemText sx={{ fontSize: '20px', textAlign: 'right', color: '#509A57' }}
                                    primary={
                                        <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                            +{sendTokens.length ?? '-'} {sendTokens[0].symbol ?? ''}
                                        </Typography>
                                    } />
                            </ListItem> :
                            <Collapse id="assetsInScroll" className="scroll" in={!open} timeout="auto" unmountOnExit sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                {renderList()}
                            </Collapse>
                }
            </List>
        </div>
    );
}

export default AssetsIn;