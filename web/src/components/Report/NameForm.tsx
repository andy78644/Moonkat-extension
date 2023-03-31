import React, { useState } from "react";
import Tag from './Tag'

import './NameForm.css'

interface Props {
    placeholder: any,
    formHeight: number,
    onTextValue: any,
}

const tags: Array<string> = ["Uniswap", "Uniswap v3", "Unicorn"]

const NameForm = (props: Props) => {
    const { placeholder, onTextValue, formHeight } = props;
    console.log(formHeight)
    const [textValue, setTextValue] = useState('');

    const deleteTag = () => { }

    return (
        <>
            <div id="nameForm">
                <input
                    id="nameFormInput"
                    style={{ height: `${formHeight}px` }}
                    value={textValue}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setTextValue(e.target.value)
                        onTextValue(e.target.value)
                    }}
                />
            </div>
            <div id="nameFormTagSection">
                {tags.map((tag, index) => (
                    <Tag index={index} text={tag} setDeleteTag={deleteTag} />
                ))}
            </div>
        </>

    );
}

export default NameForm