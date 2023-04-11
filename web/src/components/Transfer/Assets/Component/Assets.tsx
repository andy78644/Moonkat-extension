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
    const [isNFT, setIsNFT] = useState('not_ready')
    const { expand } = props
    useEffect(() => {
        console.log(`[Assets.tsx]: type ${type}`)
        if (!type) { }
        else if (type === "ERC20" || type === "NATIVE") {
            setImgSource(tokenURL)
            setIsNFT('false')
        }
        else if (collectionIconUrl !== null) {
            console.log(`[Assets.tsx] UE2:`)
            setImgSource(collectionIconUrl)
            setIsNFT('true')
        }
        else {
            console.log(`[Assets.tsx] UE3:`)
            setImgSource(tokenURL)
            setIsNFT('true')
        }
    }, [tokenURL, collectionIconUrl, type, isNFT])

    if (!sendTokens || !sendTokens[0]) return <></>

    console.log(`[Assets.tsx] isNFT: ${isNFT}`)
    console.log(`[Assets.tsx] tokenLength : ${tokenLength}`)

    if (isNFT === 'not_ready') return <></>
    else return (
        <>
            {
                isNFT === 'true' ?
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
                                                        {token.amount < 0.0001 ? '<' : operator}{token.amount < 0.0001 ? 0.0001 : token.amount} {token.symbol.length > 5 ? token.symbol.substring(0, 5) + "..." : token.symbol}
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
                    :
                    sendTokens.map((token: any, index: number) => {
                        return (
                            <ListItem key={index}>
                                <img src={token.tokenURL ?? nft} height="48px" width="48px" alt="Tokens" />
                                <ListItemText sx={{ maxWidth: '30%', fontSize: '20px', paddingLeft: '8px' }}
                                    primary={
                                        <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                            {token.title.length > 9 ? token.title.substring(0, 9) + "..." : token.title}
                                        </Typography>
                                    }
                                />
                                <ListItemText sx={{ fontSize: '20px', textAlign: 'right', color: '#509A57' }}
                                    primary={
                                        <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100, color: (theme) => (theme.palette.secondary.main) }}>
                                            {token.amount < 0.0001 ? '<' : operator}{token.amount < 0.0001 ? 0.0001 : token.amount} {token.symbol.length > 5 ? token.symbol.substring(0, 5) + "..." : token.symbol}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        )
                    })
            }
        </>
    )
}

export default Assets