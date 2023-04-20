import React from "react"
import ListItem from "@mui/material/ListItem"
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import nft from '../../../../assets/icons8-nft-64.png'

interface Props {
    title: string
    color: string
    amount: number
    symbol: string
    imgURL: string
    tokenId: string
    operator: string
    tokenURL: string
}

const Assets = (props: Props) => {

    const { title, color, amount, symbol, tokenId, imgURL, tokenURL, operator } = props

    return (
        <>
            <ListItem key={tokenId}>
                <a href={tokenURL} target="_blank"><img src={imgURL ?? nft} height="48px" width="48px" alt="Tokens" /></a>
                <ListItemText sx={{ paddingLeft: '8px' }}
                    primary={
                        <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                            {title.length > 8 ? title.substring(0, 8) + "..." : title}
                        </Typography>
                    }
                />
                <ListItemText sx={{ textAlign: 'right', color: () => (color) }}
                    primary={
                        <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                            {operator}{amount} {symbol.length > 5 ? symbol.substring(0, 5) + "..." : symbol}
                        </Typography>
                    }
                />
            </ListItem>
        </>
    )
}

export default Assets