import React, { useState } from "react";
import Box from '@mui/material/Box';

import './ReportForm.css'

interface Props {
    placeholder: any,
    formHeight: number,
    onTextValue: any,
}

const ReportForm = (props: Props) => {
    const { placeholder, onTextValue, formHeight } = props;
    const [textValue, setTextValue] = useState('');
    return (
        <div id="reportForm">
            <textarea
                id="reportFormInput"
                style={{ height: `${formHeight}px` }}
                value={textValue}
                placeholder={placeholder}
                onChange={(e) => {
                    setTextValue(e.target.value)
                    onTextValue(e.target.value)
                }}
            />
        </div>
    );
}

export default ReportForm;