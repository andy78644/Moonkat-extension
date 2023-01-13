import React, { useState } from "react";

interface Props {
    // formIcon: any;
    operation: any,
    placeholder: any
}

const ReportForm = (props: Props) => {
    const [value, setValue] = useState('');
    return (
        <form onSubmit={props.operation}>
            <textarea value={value} onChange={(e) => setValue(e.target.value)} />
        </form>
    );
}

export default ReportForm;