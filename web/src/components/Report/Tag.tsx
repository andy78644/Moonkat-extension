import React from "react";
import './Tag.css'

interface Props {
    index: number
    text: string
    display: string
    setDeleteTag: any
}

const Tag = (props: Props) => {
    const { index, text, display, setDeleteTag } = props
    return (
        <div key={index} className="tag" style={{display: `${display}`}}>
            <button onClick={() => setDeleteTag(index)}> x</button>
            {text}
            <button onClick={() => setDeleteTag(index)}> x</button>
        </div>
    )
}

export default Tag