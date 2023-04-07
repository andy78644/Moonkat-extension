import React, { useEffect, useState } from "react";
import Add from "../../../assets/add.png"
import Select from "../../../assets/select.png"
import Close from "../../../assets/close.png"
import './Tag.css'

interface Props {
    index: number
    tagLength: number
    mode: string
    text: string
    display: string
    selected: boolean
    onDeleteTag: any
    onSelectTag: any
}

const Tag = (props: Props) => {
    const { index, tagLength, mode, text, display, selected, onDeleteTag, onSelectTag } = props
    const [isSelected, setIsSelected] = useState(false)
    const [showBefore, setShowBefore] = useState(false)
    const [showAfter, setShowAfter] = useState(false)
    const [margin, setMargin] = useState("8px")
    const [textColor, setTextColor] = useState("#77736A")
    const [tagColor, setTagColor] = useState("#FFF8EA")
    useEffect(() => {
        switch (mode) {
            case "NameForm":
                setShowBefore(false)
                setShowAfter(false)
                break;
            case "DynamicTagForm":
                setShowBefore(false)
                setShowAfter(true)
                setTagColor("#DFD8CA")
                setMargin("16px")
                break;
            case "StaticTagForm":
                setShowBefore(true)
                setShowAfter(false)
                break;
            default:
        }
    }, [mode])
    useEffect(() => {
        setIsSelected(selected)
    }, [selected])
    useEffect(() => {
        if (mode !== "DynamicTagForm") {
            if (isSelected) {
                setTagColor("#77736A")
                setTextColor("#FFF8EA")
                onSelectTag(text)
            }
            else {
                setTagColor("#FFF8EA")
                setTextColor("#77736A")
                onDeleteTag(text)
            }
        }
    }, [isSelected])
    return (
        <div key={index} className="tag" style={{ display: display, backgroundColor: tagColor, marginRight: margin }}>
            {showBefore ? <button
                style={{ paddingLeft: 0, display: `${display}` }}
                onClick={() => { if (tagLength <= 3 || isSelected) setIsSelected(!isSelected) }}>
                <img src={isSelected ? Select : Add} width="12px" height="12px"></img>
            </button> : null}
            <button
                style={{ whiteSpace: 'nowrap', color: textColor, padding: 0, fontSize: '16px', cursor: 'pointer', backgroundColor: tagColor }}
                onClick={() => { if (tagLength <= 3 || isSelected) setIsSelected(!isSelected) }}>
                {text}
            </button>
            {showAfter ? <button
                style={{ paddingRight: 0, display: display, backgroundColor: tagColor }}
                onClick={() => onDeleteTag(text)}>
                <img src={Close} width="12px" height="12px"></img>
            </button> : null}
        </div>
    )
}

export default Tag