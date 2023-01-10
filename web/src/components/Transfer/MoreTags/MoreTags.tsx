import React from "react";
import TagSection from "./TagSection";
import TagBar from "./TagBar";
import Tag from "./Tag";

interface Props {
    
}

const MoreTags = () => {
    return (
        <div>
            More Tags
            <TagSection />
            <TagSection />
        </div>
    )
}

export default MoreTags;