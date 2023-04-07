import React, { useState, useEffect } from 'react'
import Tag from './Tag'

import './TagSection.css'

interface Props {
    input: string
    mode: string
    tags: string[]
    onDeleteTag: any
    onInput: any
}

const TagSection = (props: Props) => {
    const { input, mode, tags, onDeleteTag, onInput } = props
    const [margin, setMargin] = useState(0)
    const [display, setDisplay] = useState("")
    const [padding, setPadding] = useState(0)
    const [layout, setLayout] = useState("")
    const [selectedList, setSelectedList] = useState<Array<boolean>>([false, false, false])
    useEffect(() => {
        const eachTag = input.split(',')
        const newSelectedList: Array<boolean> = [false, false, false]
        eachTag.map((tag: string) => {
            for (let i in tags)
                if (tags[i] === tag) {
                    newSelectedList[i] = true
                }
        })
        setSelectedList(newSelectedList)
    }, [input])
    useEffect(() => {
        switch (mode) {
            case "NameForm":
                setMargin(16)
                setDisplay("inline-block")
                setLayout("inline-block")
                break;
            case "DynamicTagForm":
                setMargin(0)
                setDisplay("flex")
                setPadding(8)
                setLayout("inline-block")
                break;
            case "StaticTagForm":
                setMargin(16)
                setDisplay("inline-block")
                break;
            default:
                setMargin(16)
                setDisplay("inline-block")
                setLayout("inline-block")
        }
    }, [mode])
    const handleDelectTag = (delText: string) => {
        const inputTags = input?.split(',')
        inputTags.map((tag: string) => {
            if (tag === delText) onDeleteTag(delText)}
        )
    }
    const handleInputTag = (newTag: string) => {
        const inputTags = input?.split(',')
        if (!inputTags.includes(newTag)) onInput(newTag)
    }
    const handleInputLength = () => {
        const inputTags = input?.split(',')
        return inputTags.length
    }
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
                        <div style={{display: `${layout}`}} key={index}>
                            <Tag
                                key={index}
                                tagLength={handleInputLength()}
                                selected={selectedList[index]}
                                index={index} text={tag}
                                display={display} mode={mode}
                                onDeleteTag={handleDelectTag} onSelectTag={handleInputTag} 
                            />
                        </div>
                )
            }
            )}
        </div>
    )
}

export default TagSection