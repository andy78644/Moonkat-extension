import React from "react";
import Button from '@mui/material/Button';

import './InfoNavBar.css'

interface Props {
    page: any,
    onChange: any,
}

const InfoNavBar = (props: Props) => {
    return (
        <div id="infoNavBar">
            <Button sx={{
                color: '#434343',
                borderRadius: 0,
                '&:hover, &:focus': {
                    borderBottom: 1.5,
                    borderColor: '#77736A'
                },
                paddingTop: 2,
                paddingBottom: 2,
                width: '50%'
                }} 
                onClick={()=>props.onChange(0)}> Token 
            </Button>
            <Button sx={{
                color: '#434343',
                borderRadius: 0,
                '&:hover, &:focus': {
                    borderBottom: 1.5,    
                    borderColor: '#77736A'
                },
                paddingTop: 2,
                paddingBottom: 2,
                width: '50%'
                }} 
                onClick={()=>props.onChange(1)}> Creator 
            </Button>
        </div>
    );
}

export default InfoNavBar;