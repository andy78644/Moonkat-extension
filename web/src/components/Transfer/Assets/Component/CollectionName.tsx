import React, { useContext } from "react"
import ListItem from "@mui/material/ListItem"
import Typography from '@mui/material/Typography'
import VerifiedIcon from '@mui/icons-material/Verified'
import { TokenContext } from './Component'

interface Props {

}
const CollectionName = (props: Props) => {
    const { type, collectionName, osVerified } = useContext(TokenContext)
    if (type==="ERC20" || type==="NATIVE" || !type ) return <></>
    return (
        <>
            <ListItem sx={{ padding: "8px 16px" }}>
                <Typography sx={{ display: 'inline-block', fontFamily: 'Lato', fontSize: '20px', fontWeight: 100, lineHeight: '100%' }}>
                    {collectionName.length > 30 ? collectionName.substring(0, 30) + "..." : collectionName}
                </Typography>
                <Typography sx={{ paddingLeft: '8px', display: 'inline-block', fontFamily: 'Lato', fontSize: '20px', fontWeight: 100, lineHeight: '100%' }}>
                    {osVerified ? <VerifiedIcon color="primary" sx={{ fontSize: 22, display:'inline-block' }} /> : null}
                </Typography>
            </ListItem>
        </>
    )
}

export default CollectionName