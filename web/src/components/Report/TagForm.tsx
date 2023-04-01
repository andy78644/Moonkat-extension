import React, { useState } from 'react'
import Tag from './Tag'
import TagSection from './TagSection'

import './TagForm.css'

const mockTags: Array<string> = ["ajsdklfjasdlkfjaksldfjalksdf", "Uniswap v3", "Unicorn"]

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
        <>
            <div id="tagForm" tabIndex={1}>
                <TagSection mode="DynamicTagForm" tags={tags} operation={deleteTag} />
                <input
                    id="tagFormInput"
                    value={input}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                />
            </div>
            <TagSection mode="StaticTagForm" tags={mockTags} operation={deleteTag} />
        </>

    )
}

export default TagForm