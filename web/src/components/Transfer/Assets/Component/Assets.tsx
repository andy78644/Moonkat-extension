import React, { useState, useEffect, useContext } from "react"
import ListItem from "@mui/material/ListItem"
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import nft from '../../../../assets/icons8-nft-64.png'
import { TokenContext } from './Component'

interface Props {
    expand: boolean
}

const Assets = (props: Props) => {

    const { sendTokens, tokenURL,
        symbol, operator, title, type,
        totalToken, collectionIconUrl,
        tokenLength } = useContext(TokenContext)
    const [imgSource, setImgSource] = useState("")
    const { expand } = props

    useEffect(() => {
        if (type === "ERC20" || type === "NATIVE" || !type)
            setImgSource(tokenURL)
        else if (collectionIconUrl !== null) setImgSource(collectionIconUrl)
        else setImgSource(tokenURL)
    }, [tokenURL, collectionIconUrl, type])

    if (!sendTokens || !sendTokens[0]) return <></>

    return (
        <>
            {
                expand && tokenLength > 1 ?
                    <Collapse id="assetsComponentScroll" className="scroll" in={expand} timeout="auto" unmountOnExit sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        {
                            sendTokens.map((token: any) => {
                                if (!token.symbol) token.symbol = "NFT"
                                return (
                                    <ListItem key={token.tokenId}>
                                        <img src={token.tokenURL ?? nft} height="48px" width="48px" alt="Tokens" />
                                        <ListItemText sx={{ paddingLeft: '8px' }}
                                            primary={
                                                <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                                    {token.tokenId.length > 9 ? token.tokenId.substring(0, 9) + "..." : token.tokenId}
                                                </Typography>
                                            }
                                        />
                                        <ListItemText sx={{ textAlign: 'right', color: (theme) => (theme.palette.secondary.main) }}
                                            primary={
                                                <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                                    {operator}{token.amount} {token.symbol.length > 5 ? token.symbol.substring(0, 5) + "..." : token.symbol}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </Collapse> :
                    <ListItem>
                        <img src={imgSource} height="48px" width="48px" alt="Tokens" />
                        <ListItemText sx={{ maxWidth: '30%', fontSize: '20px', paddingLeft: '8px' }}
                            primary={
                                <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                    {title.length > 7 ? title.substring(0, 7) + "..." : title}
                                </Typography>
                            }
                        />
                        <ListItemText sx={{ fontSize: '20px', textAlign: 'right', color: '#509A57' }}
                            primary={
                                <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100, color: (theme) => (theme.palette.secondary.main) }}>
                                    {operator}{totalToken} {symbol.length > 5 ? symbol.substring(0, 5) + "..." : symbol}
                                </Typography>
                            } />
                    </ListItem>
            }
        </>
    )
}

export default Assets