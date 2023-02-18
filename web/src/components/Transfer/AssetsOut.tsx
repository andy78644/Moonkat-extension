import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ETHIcon from '../../assets/ETH.png'
import gasFee from '../../assets/gasfee.png'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import './AssetsOut.css';

interface Props {
    contractType: string;
    sendTokens: any;
    NFTCategoryName: string | null;
    gas: any;
    tokenImageURL: string | null;
    amount: string | null;
    symbol: string | null;
}

const AssetsOut = (props: Props) => {
    const {contractType, sendTokens, NFTCategoryName, gas, tokenImageURL, amount, symbol} = props
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div id="assetsOut">
            <List sx={{ 
                width: '100%', 
                bgcolor: '#FFF8EA',
                borderRadius: 8
            }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton 
                    sx={{
                        width: '100%', 
                        bgcolor: '#FFF8EA',
                        "&:hover": {
                            backgroundColor: '#FFF8EA'
                        }
                    }}
                    component="div"
                    id="assetsOutTitle"
                    onClick={handleClick}
                    disableRipple
                >
                    Assets Send &nbsp;
                    <HelpOutlineIcon sx={{fontSize: 20}}/> 
                    <ListItemText />
                </ListItemButton>
                <hr></hr>
                <ListItem sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <img src={tokenImageURL ?? ETHIcon} alt="ETHIcon" />
                    <ListItemText 
                        sx={{
                            fontSize: '20px',
                            paddingLeft: '8px',
                        }}
                        primary={symbol ?? 'Error'} 
                    />
                    <ListItemText 
                        sx={{
                            fontSize: '20px',
                            textAlign: 'right',
                            color: '#B8463D'
                        }}
                        primary={amount ?? 'Error' + {symbol} ?? 'Error'}
                    />
                </ListItem>
                <ListItem>
                    <img src={gasFee} alt="gasFee" />
                    <ListItemText
                        sx={{
                            fontSize: '20px',
                            paddingLeft: '8px',
                        }}
                        primary="GasFee" 
                    />
                    <ListItemText 
                        sx={{
                            fontSize: '20px',
                            textAlign: 'right',
                            color: '#B8463D'
                        }}
                        primary={gas}
                    />
                </ListItem>
            </List>
        </div>
    );
}

export default AssetsOut;