import React, { useState } from "react";
import TagSection from '../Tag/TagSection'

import './NameForm.css'

interface Props {
    formHeight: number,
    onTextValue: any,
}

const tags: Array<string> = ["NFT", "DeFi", "GameFi"]

const NameForm = (props: Props) => {
    const { onTextValue, formHeight } = props
    const [textValue, setTextValue] = useState('')
    const [placeholder, setPlaceholder] = useState("What's the address name?")

    const handleTagInput = (newTag: string) => {
        setTextValue(newTag)
        onTextValue(newTag)
    }

    const deleteTag = (index: string) => {
        setTextValue('')
    }

    return (
        <>
            <div id="nameForm">
                <input
                    id="nameFormInput"
                    type="text"
                    style={{
                        height: `${formHeight}px`,
                        color: '#434343',
                        fontFamily: 'Lato-Semibold'
                    }}
                    value={textValue}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setTextValue(e.target.value)
                        onTextValue(e.target.value)
                    }}
                    onFocus={() => { setPlaceholder('') }}
                    onBlur={() => { setPlaceholder("What's the address name?") }}
                />
            </div>
            <TagSection input={textValue} mode="NameForm" tags={tags} onDeleteTag={deleteTag} onInput={handleTagInput} />
        </>

    );
}

export default NameForm