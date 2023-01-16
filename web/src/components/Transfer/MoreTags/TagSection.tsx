import React from "react";
import TagBar from "./TagBar";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import './TagSection.css'

interface Props {
    tags: any,
    tagBarName: any,
    tagDisable: any,
}

const TagSection = (props: Props) => {
    return (
        <div id="tagSection">
            <div id="tagTitle">
                <LocalOfferIcon />
                &emsp;
                {props.tagBarName}
            </div>
            <div id="tagGroups">
                <TagBar tags={props.tags} tagDisable={true}/>
            </div>
        </div>
    )
}

export default TagSection;