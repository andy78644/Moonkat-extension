import React, {useState} from "react";
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import gasFeeIcon from '../../assets/gasfee.png'
import nft from '../../assets/icons8-nft-64.png'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';

import './AssetsOut.css';

interface Props {
    contractType: string;
    sendTokens: Array<any>;
    NFTCategoryName: string | null;
    gas: string;
    gasPrice: string
}

const AssetsOut = (props: Props) => {
    const { sendTokens, gas, gasPrice } = props
    const gasFee = parseInt(gas, 16) * parseInt(gasPrice) * 10 ** (-9)
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
                return <ListItem key={token} sx={{}}>
                    <img src={token.tokenURL ?? nft} height="48px" width="48px" alt="Free Mint" />
                    <ListItemText sx={{ fontSize: '20px', textAlign: 'right'}}
                                primary={
                                    <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                        {sendTokens[0].title ?? '-'}
                                    </Typography>
                                }
                            />
                    <ListItemText sx={{ paddingLeft: '8px' }}
                        primary={
                            <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                {token.symbol ?? ''}
                            </Typography>
                        }
                    />
                    <ListItemText sx={{ textAlign: 'right', color: '#B8463D' }}
                        primary={
                            <Typography
                                sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                -{token.amount  + ' ETH' ?? '-' + token.symbol ?? ''}
                            </Typography>
                        }
                    />
                </ListItem>
            }
        });
    }

    return (
        <div id="assetsOut">
            <List sx={{ width: '100%', bgcolor: '#FFF8EA', borderRadius: 8 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton
                    sx={{ width: '100%', bgcolor: '#FFF8EA', "&:hover, &.Mui-focusVisible": { backgroundColor: '#FFF8EA' } }}
                    component="div"
                    id="assetsOutTitle"
                    onClick={handleClick}
                    disableRipple
                >
                    Assets Send &nbsp;
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
                {renderList()}

                <ListItem>
                    <img src={gasFeeIcon} alt="gasFee" />
                    <ListItemText
                        sx={{ paddingLeft: '8px' }}
                        primary={
                            <Typography
                                sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                GasFee
                            </Typography>
                        }
                    />
                    <ListItemText
                        sx={{ textAlign: 'right', color: '#B8463D' }}
                        primary={
                            <Typography
                                sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                -{gasFee.toFixed(4) + ' ETH' }
                            </Typography>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
}

export default AssetsOut;