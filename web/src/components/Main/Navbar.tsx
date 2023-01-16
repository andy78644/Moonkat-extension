import React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TransferIcon from '@mui/icons-material/SyncAlt';
import InfoIcon from '@mui/icons-material/Info';

import './Navbar.css'
import { width } from "@mui/system";

interface Props {
    section: any,
    onSection: any,
}

const Navbar = (props: Props) => {
    return (
        <div>
            <Box>
                <BottomNavigation
                    id="bottomNavigation"
                    showLabels
                    value={props.section === 'transfer' ? 0 : 1}
                    onChange={(event, newValue) => {
                        newValue = (newValue === 0 ? 'transfer' : 'moreinfo')
                        props.onSection(newValue);
                    }}
                >
                    <BottomNavigationAction id="transferIcon" label="Transfer" icon={<TransferIcon />} />
                    <BottomNavigationAction id="moreInfoIcon" label="More Info" icon={<InfoIcon />} />
                </BottomNavigation>
            </Box>
        </div>
    )
};

export default Navbar;