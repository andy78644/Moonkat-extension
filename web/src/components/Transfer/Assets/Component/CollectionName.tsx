import React, { useContext } from "react"
import ListItem from "@mui/material/ListItem"
import Typography from '@mui/material/Typography'
import VerifiedIcon from '@mui/icons-material/Verified'
import { TokenContext } from './Component'

interface Props {

}

const skipShowingList: Array<string> = ["ERC20", "NATIVE"]

const CollectionName = (props: Props) => {
    const { collectionIconUrl, collectionName, osVerified, sendTokens } = useContext(TokenContext)
    if (collectionName === "" || !sendTokens[0]) return <></>
    for (let token in skipShowingList) if (skipShowingList[token] === sendTokens[0].type) return null
    return (
        <>
            <ListItem sx={{ padding: "8px 16px" }}>
                {/* <img src={collectionIconUrl} height="48px" width="48px" alt="Tokens" /> */}
                <Typography sx={{ display: 'inline-block', fontFamily: 'Lato', fontSize: '20px', fontWeight: 100, lineHeight: '100%' }}>
                    {collectionName}
                </Typography>
                <Typography sx={{ paddingLeft: '8px', display: 'inline-block', fontFamily: 'Lato', fontSize: '20px', fontWeight: 100, lineHeight: '100%' }}>
                    {osVerified ? <VerifiedIcon color="primary" sx={{ fontSize: 22, display:'inline-block' }} /> : null}
                </Typography>
            </ListItem>
        </>
    )
}

export default CollectionName