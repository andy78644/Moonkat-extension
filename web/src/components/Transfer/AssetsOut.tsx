import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import assetOut from "../../types/assetOutType";
import ETHIcon from '../../assets/ETH.png'
import gasFee from '../../assets/gasfee.png'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import './AssetsOut.css';

interface Props {
    contractType: string;
    sendTokens: Array<assetOut>;
    NFTCategoryName: string | null;
    gas: any;
}

const AssetsOut = (props: Props) => {
    const {contractType, sendTokens, NFTCategoryName, gas} = props
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const renderList = () => {
        console.log(sendTokens)
        return sendTokens.map((token:any) =>{
                if(token){
                return <ListItem key={token.symbol} sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <img src={token.tokenURL ?? ETHIcon} alt="Free Mint" />
                    <ListItemText 
                        sx={{
                            fontSize: '20px',
                            paddingLeft: '8px',
                        }}
                        primary={token.symbol ?? 'Error'} 
                    />
                    <ListItemText 
                        sx={{
                            fontSize: '20px',
                            textAlign: 'right',
                            color: '#B8463D'
                        }}
                        primary={token.amount ?? 'Error' + token.symbol ?? 'Error'}
                    />
                </ListItem>
                }
            });
    }
  
//   
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
                {renderList()}
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