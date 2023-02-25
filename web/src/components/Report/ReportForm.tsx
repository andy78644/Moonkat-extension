import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
    operation: any,
    placeholder: any,
    formHeight: any,
}

const ReportForm = (props: Props) => {
    const [textValue, settextValue] = useState('');
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
            error={textValue.length === 0}
            helperText={!textValue.length ? 'Address Name is required' : ''}
            label={props.placeholder}
            onChange={(e) => {
                settextValue(e.target.value);
            }}
            variant="filled"
            value={textValue} />
        <h3>Your Enter Value is: {textValue} </h3>
        </Box>
    );
}

export default ReportForm;