import React from "react";
import TagSection from "./TagSection";
import TagBar from "./TagBar";
import Tag from "./Tag";

import './MoreTags.css'

interface Props {
    
}

const MoreTags = () => {
    return (
        <div id="moreTags">
            More Tags
            <TagSection tagBarName="Other names"/>
            <TagSection tagBarName="Other tags"/>
        </div>
    )
}

export default MoreTags;