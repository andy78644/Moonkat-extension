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
        tokenSymbol, operator,
        totalToken, collectionIconUrl,
        tokenLength } = useContext(TokenContext)
    const [tokenName, setTokenName] = useState("")
    const { expand } = props

    useEffect(() => {
        if (sendTokens.length > 0 && (sendTokens[0].type === "ERC20" || sendTokens[0].type === "NATIVE")) {
            setTokenName(tokenSymbol)
        } else if (sendTokens.length > 0) {
            setTokenName(sendTokens[0].tokenId)
        }
    }, [sendTokens])
    
    if (!sendTokens[0]) return <></>

    return (
        <>
            {
                tokenLength === 1 ?
                    <ListItem>
                        <img src={tokenURL} height="48px" width="48px" alt="Tokens" />
                        <ListItemText sx={{ maxWidth: '30%', fontSize: '20px', paddingLeft: '8px' }}
                            primary={
                                <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                    {tokenName.length > 7 ? tokenName.substring(0, 7) + "..." : tokenName} {/* Should be title but now is empty */}
                                </Typography>
                            }
                        />
                        <ListItemText sx={{ fontSize: '20px', textAlign: 'right', color: (theme) => (theme.palette.secondary.main) }}
                            primary={
                                <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                    {operator}{totalToken} {tokenSymbol.length > 5 ? tokenSymbol.substring(0, 5) + "..." : tokenSymbol}
                                </Typography>
                            }
                        />
                    </ListItem> :
                    expand ?
                        <ListItem>
                            <img src={collectionIconUrl} height="48px" width="48px" alt="Tokens" />
                            <ListItemText sx={{ maxWidth: '30%', fontSize: '20px', paddingLeft: '8px' }}
                                primary={
                                    <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                        {sendTokens[0].collectionName.length > 7 ? sendTokens[0].collectionName.substring(0, 7) + "..." : sendTokens[0].collectionName} {/* Should be title but now is empty */}
                                    </Typography>
                                }
                            />
                            <ListItemText sx={{ fontSize: '20px', textAlign: 'right', color: '#509A57' }}
                                primary={
                                    <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                        {operator}{totalToken} {tokenSymbol.length > 5 ? tokenSymbol.substring(0, 5) + "..." : tokenSymbol}
                                    </Typography>
                                } />
                        </ListItem> :
                        <Collapse id="assetsComponentScroll" className="scroll" in={!expand} timeout="auto" unmountOnExit sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            {
                                sendTokens.map((token: any) => {
                                    if (!token.symbol) token.symbol = "NFT"
                                    return (
                                        <ListItem key={token.tokenId}>
                                            <img src={token.tokenURL ?? nft} height="48px" width="48px" alt="Tokens" />
                                            <ListItemText sx={{ paddingLeft: '8px' }}
                                                primary={
                                                    <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                                                        {token.tokenId.length > 5 ? token.tokenId.substring(0, 9) + "..." : token.tokenId} {/* Should be title but now is empty */}
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
                        </Collapse>
            }
        </>
    )
}

export default Assets