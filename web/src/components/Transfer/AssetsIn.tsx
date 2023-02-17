import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import monkey1 from '../../assets/monkey1.png'
import monkey2 from '../../assets/monkey2.png'
import skeleton from '../../assets/skeleton.png'
import Collapse from '@mui/material/Collapse';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import './AssetsIn.css'

interface Props {
    contractType: string;
    sendTokens: any;
    NFTCategoryName: string | null;
    gas: any;
}

const AssetsIn = (props: Props) => {
    const {contractType, sendTokens, NFTCategoryName} = props
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
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
                        primary="Bored Ape Yacht Club" 
                    />
                </ListItem>
                <Collapse in={!open} timeout="auto" unmountOnExit>
                    <ListItem>
                        <img src={skeleton} alt="skeleton" />
                        <ListItemText 
                            sx={{
                                fontSize: '20px',
                                paddingLeft: '8px',
                            }}
                        />
                        <ListItemText 
                            sx={{
                                fontSize: '20px',
                                textAlign: 'right',
                                color: '#509A57'
                            }}
                            primary="+3 BAYC" 
                        />
                    </ListItem>
                </Collapse>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ListItem>
                        <img src={monkey1} alt="monkey1" />
                        <ListItemText
                            sx={{
                                fontSize: '20px',
                                paddingLeft: '8px',
                            }}
                            primary="#2337" 
                        />
                        <ListItemText 
                            sx={{
                                fontSize: '20px',
                                textAlign: 'right',
                                color: '#509A57'
                            }}
                            primary="+1 BAYC" 
                        />
                    </ListItem>
                    <ListItem>
                        <img src={monkey2} alt="monkey2" />
                        <ListItemText
                            sx={{
                                fontSize: '20px',
                                paddingLeft: '8px',
                            }}
                            primary="#2345" 
                        />
                        <ListItemText 
                            sx={{
                                fontSize: '20px',
                                textAlign: 'right',
                                color: '#509A57'
                            }}
                            primary="+2 BAYC" 
                        />
                    </ListItem>
                </Collapse>
            </List>
        </div>
    );
}

export default AssetsIn;