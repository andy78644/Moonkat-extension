import React, { useState, useEffect } from 'react'
import Tag from './Tag'

import './TagSection.css'

interface Props {
    mode: string
    tags: string[]
    operation: any
}

const TagSection = (props: Props) => {
    const { mode, tags, operation } = props
    const [margin, setMargin] = useState(0)
    const [display, setDisplay] = useState("")
    const [padding, setPadding] = useState(0)
    useEffect(() => {
        if (mode === "DynamicTagForm") {
            setMargin(0)
            setDisplay("flex")
            setPadding(8)
        } else if (mode === "NameForm") {
            setMargin(16)
            setDisplay("inline-block")
        } else {
            setMargin(16)
            setDisplay("inline-block")
        }
    }, [mode])
    return (
        <div
            id="tagSection"
            style={{
                margin: `0px ${margin}px `,
                display: `${display}`,
                paddingBottom: `${padding}px`,
                paddingLeft: `${padding}px`
            }}
        >
            {tags.map((tag, index) => {
                return (
                    mode === "StaticTagForm" ? 
                    <div>
                        <Tag index={index} text={tag} display={display} setDeleteTag={operation} />
                    </div> :
                    <Tag index={index} text={tag} display={display} setDeleteTag={operation} />
                )
            }
            )}
        </div>
    )
}

export default TagSection