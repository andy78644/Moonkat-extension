import React from "react";
import Add from "../../assets/add.png"
import Select from "../../assets/select.png"
import Close from "../../assets/close.png"
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
            <button onClick={() => setDeleteTag(index)}><img src={Add}></img></button>
            {text}
            <button onClick={() => setDeleteTag(index)}><img src={Close}></img></button>
        </div>
    )
}

export default Tag