import React, { useContext } from "react"
import nft from '../../../../assets/icons8-nft-64.png'
import ListItem from "@mui/material/ListItem";
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { TokenContext } from './Component'

interface Props {
    
}

const Withdraw = () => {
    const { tokenURL, tokenSymbol } = useContext(TokenContext)
    return (
        <>
            <ListItem sx={{ padding: "8px 16px" }}>
                <img src={tokenURL ?? nft} alt="nft" width="48px" height="48px" />
                <ListItemText
                    sx={{ paddingLeft: '8px', textAlign: 'right' }}
                    primary={
                        <div>
                            <Typography
                                sx={{ lineHeight: '100%', display: 'inline-block', fontFamily: 'Lato', fontSize: '20px', fontWeight: 500, color: '#B8463D' }}>
                                Can withdraw &nbsp;
                            </Typography>
                            <Typography
                                sx={{ lineHeight: '100%', display: 'inline-block', fontFamily: 'Lato-bold', fontSize: '20px', fontWeight: 900, color: '#B8463D' }}>
                                ALL {tokenSymbol}s
                            </Typography>
                        </div>

                    }
                />
            </ListItem>
        </>
    )
}

export default Withdraw