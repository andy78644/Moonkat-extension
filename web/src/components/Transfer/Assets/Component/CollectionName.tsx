import React from "react"
import ListItem from "@mui/material/ListItem"
import Typography from '@mui/material/Typography'
import VerifiedIcon from '@mui/icons-material/Verified'

interface Props {
    osVerified: boolean
    collectionName: string
}
const CollectionName = (props: Props) => {
    const { collectionName, osVerified } = props
    return (
        <>
            <ListItem sx={{ padding: "8px 16px" }}>
                <Typography sx={{ display: 'inline-block', fontFamily: 'Lato', fontSize: '20px', fontWeight: 100, lineHeight: '100%' }}>
                    {collectionName.length > 30 ? collectionName.substring(0, 30) + "..." : collectionName}
                </Typography>
                <span style={{ paddingLeft: '8px', display: 'inline-block', lineHeight: '100%' }}>
                    {osVerified ? <VerifiedIcon color="primary" sx={{ fontSize: 22, display:'inline-block' }} /> : null}
                </span>
            </ListItem>
        </>
    )
}

export default CollectionName