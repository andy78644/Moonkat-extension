import React from "react";
import Button from '@mui/material/Button'
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
            <Button sx={{
                color: 'grey',
                borderRadius: 0,
                '&:hover, &:focus': {
                    color: '#000000',
                },
                paddingTop: 2,
                paddingBottom: 2,
                width: '50%'
                }} 
                disableRipple
                startIcon={<TransferIcon />}
                onClick={()=>props.onSection('transfer')}> Transfer 
            </Button>
            <Button sx={{
                color: 'grey',
                borderRadius: 0,
                '&:hover, &:focus': {
                    color: '#000000',
                },
                paddingTop: 2,
                paddingBottom: 2,
                width: '50%'
                }} 
                disableRipple
                startIcon={<InfoIcon />}
                onClick={()=>props.onSection('moreInfo')}> More Info 
            </Button>
        </div>
    )
};

export default Navbar;