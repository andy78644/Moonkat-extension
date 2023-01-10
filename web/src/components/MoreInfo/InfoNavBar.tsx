import React from "react";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

interface Props {
    page: any,
    onChange: any,
}

const InfoNavBar = (props: Props) => {
    return (
        <div>
            <Box sx={{ width: 500 }}>
                <BottomNavigation
                    showLabels
                    value={props.page}
                    onChange={(event, newValue) => {
                        props.onChange(newValue);
                    }}
                >
                    <BottomNavigationAction label="Token" />
                    <BottomNavigationAction label="Creator" />
                </BottomNavigation>
            </Box>
        </div>
    );
}

export default InfoNavBar;