import React from "react";

import './Tag.css'

interface Props {
    tagName: any,
    tagDisable: boolean
}

const Tag = (props: Props) => {
    return (
        <div id="tag">
            {props.tagName}
        </div>
    );
}

export default Tag;