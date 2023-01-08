import React from "react";
import Button from "@mui/material/Button"
import Report from "./Report/Report";

interface Props {
    productType: any;
    productAction: any;
}

const Header = () => {
    return (
        <div>
            NFT - MINTING
            <Button variant="text">Report</Button> 
            <Button variant="text">MoreTags</Button> 
        </div>
    )
}

export default Header;