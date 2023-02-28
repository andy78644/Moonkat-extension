import React from "react";
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import gasFeeIcon from '../../assets/gasfee.png'
import nft from '../../assets/icons8-nft-64.png'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import './AssetsOut.css';

interface Props {
    contractType: string;
    sendTokens: Array<any>;
    NFTCategoryName: string | null;
    gas: string;
    gasPrice: string
}

const AssetsOut = (props: Props) => {
    const {sendTokens, gas, gasPrice} = props
    const gasFee = parseInt(gas, 16) * parseInt(gasPrice) * 10**(-9)
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const renderList = () => {
        console.log("Token List: ", sendTokens)
        return sendTokens.map((token:any) =>{
                if(token){
                return <ListItem key={token} sx={{
                }}>
                    <img src={token.tokenURL ?? nft} height="48px" width="48px" alt="Free Mint" />
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
                    <img src={gasFeeIcon} alt="gasFee" />
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
                        primary={gasFee.toFixed(4)}
                    />
                </ListItem>
            </List>
        </div>
    );
}

export default AssetsOut;