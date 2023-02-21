import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import nft from '../../assets/icons8-nft-64.png'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import './AssetsApprove.css';

interface Props {
    contractType: string;
    sendTokens: any;
    NFTCategoryName: string | null;
}

const AssetsApprove = (props: Props) => {
    const {contractType, sendTokens, NFTCategoryName} = props
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div id="assetsApprove">
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
                    Assets Approve &nbsp;
                    <HelpOutlineIcon sx={{fontSize: 20}}/> 
                    <ListItemText />
                </ListItemButton>
                <hr></hr>
                <ListItem>
                    <ListItemText 
                        sx={{
                            fontSize: '20px',
                        }}
                        primary={sendTokens.name}
                    />
                </ListItem>
                <ListItem>
                    <img src={sendTokens.tokenURL ?? nft} alt="nft" />
                    <ListItemText 
                        sx={{
                            fontSize: '20px',
                            textAlign: 'right',
                        }}
                        primary={`Can withdraw all ${sendTokens.symbol}`}
                    />
                </ListItem>
            </List>
        </div>
    )
};

export default AssetsApprove;