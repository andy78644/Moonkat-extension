import React, { useContext } from "react"
import ListItem from "@mui/material/ListItem"
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import VerifiedIcon from '@mui/icons-material/Verified'
import { TokenContext } from './Component'

interface Props {
    
}

const CollectionName = (props: Props) => {
    const { collectionIconUrl, collectionName, osVerified } = useContext(TokenContext)
    if (collectionName === "") return <></>
    return (
        <>
            <ListItem sx={{ padding: "8px 16px" }}>
                <img src={collectionIconUrl} height="48px" width="48px" alt="Tokens" />
                <ListItemText sx={{  paddingLeft: '8px' }}
                    primary={
                        <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100, lineHeight: '100%' }}>
                            {collectionName}
                        </Typography>
                    }
                />
                {osVerified ? <VerifiedIcon color="primary" sx={{ fontSize: 22 }} /> : <></>}
            </ListItem>
        </>
    )
}

export default CollectionName