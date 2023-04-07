import React, { useState, useContext } from "react"
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import { TokenContext } from './Component'

interface Props {
    expand: boolean
    setExpand: any,
}

const Header = (props: Props) => {

    const { expand, setExpand } = props
    const { mode, verbForPopOverText, tokenLength } = useContext(TokenContext)

    // PopOver
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const hover = Boolean(anchorEl)
    const handleClick = () => { if (tokenLength > 1) setExpand(!expand) }
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget) }
    const handlePopoverClose = () => { setAnchorEl(null) }

    return (
        <div>
            <ListItemButton
                sx={{ lineHeight: "100%", paddingTop: "8px", paddingBottom: "16px", fontFamily: "Lato", fontSize: "20px", width: '100%', "&:hover, &.Mui-focusVisible": { backgroundColor: '#FFF8EA' } }}
                component="div"
                onClick={handleClick}
                disableRipple
            >
                {mode} &nbsp;
                <Typography
                    aria-owns={hover ? 'assetsComponentPopOver' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    <HelpOutlineIcon sx={{ fontSize: 18 }} />
                </Typography>
                <Popover 
                    id="assetsComponentPopover"
                    sx={{ pointerEvents: 'none' }}
                    open={hover}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>The assets will {verbForPopOverText} after confirm this txn.</Typography>
                </Popover>
                <ListItemText />
                {
                    tokenLength > 1
                        ?
                        expand ?
                            <ExpandLess sx={{ fontSize: '20px' }} /> :
                            <ExpandMore sx={{ fontSize: '20px' }} />
                        :
                        <div></div>
                }
            </ListItemButton>

            <hr></hr>
        </div>
    )
}

export default Header