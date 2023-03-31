import React from "react";
import './Tag.css'

interface Props {
    index: number
    text: string
    setDeleteTag: any
}

const Tag = (props: Props) => {
    const { index, text, setDeleteTag } = props
    return (
        <div key={index} className="tag">
            {text}
            <button onClick={() => setDeleteTag(index)}> x</button>
        </div>
    )
}

export default Tag