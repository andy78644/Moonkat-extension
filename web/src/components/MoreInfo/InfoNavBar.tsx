import React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import './InfoNavBar.css'

interface Props {
    page: any,
    onChange: any,
}

const InfoNavBar = (props: Props) => {
    return (
        <div>
            <Box>
                <BottomNavigation
                    id="infoNavBar"
                    showLabels
                    value={props.page}
                    onChange={(event, newValue) => {
                        props.onChange(newValue);
                    }}
                >
                    <BottomNavigationAction id="transferIcon" label="Token"/>
                    <BottomNavigationAction id="moreInfoIcon" label="Creator"/>
                </BottomNavigation>
            </Box>
        </div>
    );
}

export default InfoNavBar;