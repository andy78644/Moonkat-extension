import React from "react";
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import nft from '../../assets/icons8-nft-64.png'
import Collapse from '@mui/material/Collapse';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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
    console.log("In Tokens: ", sendTokens)
    const renderList = () => {
        return sendTokens.map((token:any) =>{
                if(token){  
                return <ListItem key={token} sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                            }}>
                        <ListItem>
                        <img src={token.tokenURL ?? nft} height="48px" width="48px" alt="Asset In" />
                        <ListItemText 
                            sx={{
                                fontSize: '20px',
                                textAlign: 'right',
                                color: '#509A57',
                            }}
                            primary={`${token.amount}${token.symbol}`}
                        /></ListItem>
                </ListItem>
                }
        });
    }
    return (
        <div id="assetsIn">
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
                    }}
                    component="div"
                    id="assetsOutTitle"
                    onClick={handleClick}
                >
                    Assets Receive &nbsp;
                    <HelpOutlineIcon sx={{fontSize: 20}}/> 
                    <ListItemText />
                    {open ? 
                        <ExpandLess /> : 
                        <ExpandMore />
                    }
                </ListItemButton>
                <hr></hr>
                <ListItem>
                    <ListItemText 
                        sx={{
                            fontSize: '20px',
                        }}
                        primary={sendTokens[0].name}
                    />
                </ListItem>
                { sendTokens.length === 1 ? 
                    <ListItem>
                    <img src={sendTokens[0].tokenURL ?? nft} height ="48px" width="48px"alt="Tokens" />
                    <ListItemText 
                        sx={{
                            fontSize: '20px',
                            textAlign: 'right',
                            color: '#509A57'
                        }}
                        primary={`${sendTokens[0].amount}${sendTokens[0].symbol}`}
                    />
                    </ListItem>
                    :
                    <ListItem sx={{
                        width: '100%',
                        display: 'flex',
                    }}>
                        <Collapse in={!open} timeout="auto" unmountOnExit sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                                <ListItem >
                                <img src={sendTokens[0].tokenURL ?? nft} height ="48px" width="48px"alt="Tokens" />
                                <ListItemText 
                                    sx={{
                                        fontSize: '20px',
                                        textAlign: 'right',
                                        color: '#509A57'
                                    }}
                                    primary={`${sendTokens.length}${sendTokens[0].symbol}`}
                                /></ListItem>
                        </Collapse>
                        <Collapse in={open} timeout="auto" unmountOnExit sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                            {renderList()}
                        </Collapse>
                    </ListItem>
                }
            </List>
        </div>
    );
}

export default AssetsIn;