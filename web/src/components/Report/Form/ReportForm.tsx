import React, { useState } from "react";

import './ReportForm.css'

interface Props {
    formHeight: number,
    onTextValue: any,
}

const ReportForm = (props: Props) => {
    const { onTextValue, formHeight } = props;
    const [textValue, setTextValue] = useState('');
    const [placeholder, setPlaceholder] = useState("Share more detail with the community!")
    return (
        <div id="reportForm">
            <textarea
                id="reportFormInput"
                style={{ 
                    fontSize: '16px', 
                    height: `${formHeight}px`, 
                    resize: 'none', 
                    minHeight: '130px', 
                    fontFamily: 'Lato-Semibold', 
                    lineHeight: '120%',
                    color: '#434343'
                }}
                value={textValue}
                placeholder={placeholder}
                onChange={(e) => {
                    setTextValue(e.target.value)
                    onTextValue(e.target.value)
                }}
                onFocus={()=>{setPlaceholder('')}}
                onBlur={()=>{setPlaceholder("Share more detail with the community!")}}
            />
        </div>
    );
}

export default ReportForm;