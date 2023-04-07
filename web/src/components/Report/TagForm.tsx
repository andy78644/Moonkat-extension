import React, { useState } from 'react'
import Tag from './Tag'

import './TagForm.css'

const TagForm = () => {
    const [input, setInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    const onChange = (e: any) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e: any) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }
        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();

            setTags(tagsCopy);
            setInput(poppedTag!!);
        }
        setIsKeyReleased(false);
    };
    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index: any) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    return (
        <div id="tagForm">
            {tags.map((tag, index) => (
                <Tag index={index} text={tag} setDeleteTag={deleteTag} />
            ))}
            <input
                id="tagFormInput"
                value={input}
                onKeyDown={onKeyDown}
                onKeyUp={onKeyUp}
                onChange={onChange}
            />
        </div>
    )
}

export default TagForm