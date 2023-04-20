import React, { useContext } from "react"
import ListItem from "@mui/material/ListItem"
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import gasFeeIcon from '../../../../assets/gasfee.png'

interface Props {
    gasFee: number
    operator: string
}

const GasFee = (props: Props) => {

    const { operator, gasFee } = props

    return (
        <>
            <ListItem>
                <img src={gasFeeIcon} alt="gasFee" />
                <ListItemText
                    sx={{ paddingLeft: '8px' }}
                    primary={
                        <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                            GasFee
                        </Typography>
                    }
                />
                <ListItemText
                    sx={{ textAlign: 'right', color: '#B8463D' }}
                    primary={
                        <Typography sx={{ fontFamily: 'Lato', fontSize: '20px', fontWeight: 100 }}>
                            {operator}{gasFee} ETH
                        </Typography>
                    }
                />
            </ListItem>
        </>
    )
}

export default GasFee