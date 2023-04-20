import React, { useState } from "react"
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import '../Component.css'

interface Props {
    mode: string
    setExpand: any
    expand: boolean
    defaultExpand: boolean
    verbForPopOver: string
}

const Header = (props: Props) => {

    const { mode, expand, setExpand, defaultExpand, verbForPopOver } = props

    // PopOver
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const hover = Boolean(anchorEl)
    const handleClick = () => { if (defaultExpand) setExpand(!expand) }
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
                <span
                    style={{width: '18px', height: '18px'}}
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    <HelpOutlineIcon sx={{ fontSize: 18 }} />
                </span>
                <Popover
                    className="assetsComponentPopover"
                    sx={{ pointerEvents: 'none' }}
                    open={hover}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ fontSize: '14px', color: '#434343', padding: '4px' }}>The assets will {verbForPopOver} after confirm this txn.</Typography>
                </Popover>
                <ListItemText />
                {
                    defaultExpand ?
                        expand ?
                            <ExpandLess sx={{ fontSize: '20px' }} /> :
                            <ExpandMore sx={{ fontSize: '20px' }} />
                        : null
                }
            </ListItemButton>
            <hr style={{border: '1px solid #E6E0D3', margin: '0px 0px 8px 0px'}}></hr>
        </div>
    )
}

export default Header