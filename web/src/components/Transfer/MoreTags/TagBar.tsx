import React from "react";
import Tag from "./Tag";

interface Props {
    tags: any,
    tagDisable: any
}

const TagBar = (props: Props) => {
    // return (
    //     <div>
    //         <Tag tagName={props.tags[0].name} tagDisable={props.tagDisable}/>
    //     </div>
    // )
    return (
        <div>
        {
            props.tags.map(
                (tag: any) => 
                <Tag 
                    tagName={tag.name} 
                    tagDisable={props.tagDisable}
                />
            )
        }
        </div>
    )
}

export default TagBar;