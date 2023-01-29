import React from "react";
import TagSection from "./TagSection";
import TagBar from "./TagBar";
import Tag from "./Tag";

import './MoreTags.css'

interface Props {
    
}

const tagExample1: any[] = [
    {
        name: "BAYC token",
        color: "red",
    },
    {
        name: "Bored Ape Yacht Club",
        color: "red",
    },
    {
        name: "Monkey MFT",
        color: "red",
    },
]

const tagExample2: any[] = [
    {
        name: "PFP",
        color: "green",
    },
    {
        name: "New Project",
        color: "green",
    },
]

const tagExample3: any[] = [
    {
        name: "Charity",
        color: "blue",
    },
    {
        name: "Sustainable",
        color: "blue",
    },
    {
        name: "Profitable",
        color: "blue",
    },
]

const MoreTags = () => {
    return (
        <div id="moreTags">
            <div id="moreTagsTitle">More Tags</div>
            <TagSection tags={tagExample1} tagBarName="Other names" tagDisable={true}/>
            <TagSection tags={tagExample2} tagBarName="Other tags" tagDisable={true}/>
            <TagSection tags={tagExample3} tagBarName="Other stuff" tagDisable={true}/>
        </div>
    )
}

export default MoreTags;