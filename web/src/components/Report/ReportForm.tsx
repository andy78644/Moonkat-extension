import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
    operation: any,
    placeholder: any,
    formHeight: any,
}

const ReportForm = (props: Props) => {
    const [value, setValue] = useState('');
    return (
        <Box
            component="form"
            sx={{
                marginLeft: 0.5,
                marginRight: 0.5,
            }}
            noValidate
            autoComplete="off"
        >
            <TextField sx={{
                width: '100%',
                "& .MuiInputBase-root": {
                    height: props.formHeight
                }
            }} 
            label={props.placeholder} 
            variant="filled" />
        </Box>
    );
}

export default ReportForm;