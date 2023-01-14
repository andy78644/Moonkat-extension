import React from "react";
import TagBar from "./TagBar";

interface Props {
    tagBarName: any,
}

const TagSection = (props: Props) => {
    return (
        <div>
            {props.tagBarName}
            <div>
                <TagBar />
            </div>
        </div>
    )
}

export default TagSection;