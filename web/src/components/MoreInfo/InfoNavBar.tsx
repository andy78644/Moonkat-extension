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
            <Box sx={{
                        bgcolor: 'yellow',
                        '& .Mui-selected': {
                        '& .MuiBottomNavigationAction-label': {
                            fontSize: theme => theme.typography.caption,
                            transition: 'none',
                            fontWeight: 'bold',
                            lineHeight: '20px'
                        },
                        '& .MuiSvgIcon-root, & .MuiBottomNavigationAction-label': {
                            color: theme => theme.palette.secondary.main
                        }
                        }
                    }}>
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