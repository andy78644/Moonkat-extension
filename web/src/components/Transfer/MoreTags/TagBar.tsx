import React from "react";
import Tag from "./Tag";

interface Props {
    tagNumber: any,
    tagNames: any,
    tagColors: any
}

const TagBar = () => {
    return (
        <div>
            <Tag />
        </div>
    )
}

export default TagBar;