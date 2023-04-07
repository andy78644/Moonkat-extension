import React from "react"

import './SectionHeader.css'

interface Props {
    icon: any
    content: string
}

const SectionHeader = (props: Props) => {
    const { icon, content } = props
    return (
        <div id="reportSectionHeader">
            <img id="reportSectionImage" src={icon} width="17px" height="17px"/> &nbsp;
            <div id="reportSectionContent">{content}</div>
        </div>
    )
}

export default SectionHeader