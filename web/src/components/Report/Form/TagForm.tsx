import React, { useEffect, useState } from 'react'
import TagSection from '../Tag/TagSection'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Danger from '../../../assets/danger.png'
import { IconButton } from '@mui/material'

import './TagForm.css'

interface Props {
    onSetTags: any
}

const defaultTags: Array<string> = ["NFT", "DeFi", "GameFi"]

const TagForm = (props: Props) => {
    const { onSetTags } = props
    const [input, setInput] = useState('');
    const [totalInput, setTotalInput] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [isKeyReleased, setIsKeyReleased] = useState(false)
    const [placeholder, setPlaceholder] = useState('Enter the tags...');

    // PopOver
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const hover = Boolean(anchorEl)
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget) }
    const handlePopoverClose = () => { setAnchorEl(null) }

    const onChange = (e: any) => {
        const { value } = e.target
        setInput(value)
    };

    useEffect(() => {
        if (tags.length >= 1) setPlaceholder('')
        else setPlaceholder('Enter the tags...')
    }, [tags])

    const onKeyDown = (e: any) => {
        const { key } = e;
        const trimmedInput = input.trim();

        if (key === 'Enter' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault()
            const tagsCopy = [...tags, trimmedInput]
            setTags(tagsCopy)
            onSetTags(tagsCopy)
            let newTotalInput: string = ""
            tagsCopy.map((tag: string) => newTotalInput += tag + ',')
            setTotalInput(newTotalInput)
            setInput('')
        }
        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            e.preventDefault()
            const tagsCopy = [...tags]
            tagsCopy.pop()
            let newTotalInput: string = ""
            tagsCopy.map((tag: string) => newTotalInput += tag + ',')
            setTags(tagsCopy)
            onSetTags(tagsCopy)
            setInput('')
            setTotalInput(newTotalInput)
        }
        setIsKeyReleased(false);
    };
    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const handleTagInput = (newTag: string) => {
        if (tags.length < 3) {
            const newTagsCopy = [...tags, newTag]
            setTags(newTagsCopy)
            onSetTags(newTagsCopy)
            let newTotalInput: string = ""
            newTagsCopy.map((tag: string) => newTotalInput += tag + ',')
            setTotalInput(newTotalInput)
            setInput('')
        }
    }

    const handleDeleteTag = (delText: string) => {
        const newTagsCopy = tags.filter((tag: string) => tag !== delText)
        setTags(newTagsCopy)
        onSetTags(newTagsCopy)
        const newTotalInput: string = totalInput
        setTotalInput(newTotalInput.split(',').filter((tag: string) => tag !== delText).join(','))
    }

    return (
        <>
            <div id="tagForm" tabIndex={1}>
                <TagSection input={totalInput} mode="DynamicTagForm" tags={tags} onDeleteTag={handleDeleteTag} onInput={handleTagInput} />
                {tags.length < 3 ?
                    <input
                        id="tagFormInput"
                        style={{
                            color: '#434343',
                            fontFamily: 'Lato-Semibold'
                        }}
                        type="text"
                        value={input}
                        placeholder={placeholder}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        onChange={onChange}
                        onFocus={() => { setPlaceholder('') }}
                        onBlur={() => { setPlaceholder('Enter the tags...') }}
                    /> : null
                }
                {tags.length === 3 ?
                    <IconButton
                        id="tagFormDanger"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        <img src={Danger} width="16px" height="16px" />
                        <Popover
                            id="tagFormInputPopOver"
                            sx={{ pointerEvents: 'none' }}
                            open={hover}
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            &nbsp; You can only input up to three tags. &nbsp;
                        </Popover>
                    </IconButton> : null
                }
            </div>
            <TagSection input={totalInput} mode="StaticTagForm" tags={defaultTags} onDeleteTag={handleDeleteTag} onInput={handleTagInput} />
        </>

    )
}

export default TagForm