import React, { useState } from "react";
import Box from '@mui/material/Box';

import './ReportForm.css'

interface Props {
    placeholder: any,
    formHeight: any,
    onTextValue: any,
}

const ReportForm = (props: Props) => {
    const { placeholder } = props;
    const [textValue, setTextValue] = useState('');
    return (
        <div id="reportForm">
            <input
                id="reportFormInput"
                value={textValue}
                placeholder={placeholder}
                // onKeyDown={onKeyDown}
                onChange={(e) => setTextValue(e.target.value)}
            />
        </div>
    );
}

export default ReportForm;