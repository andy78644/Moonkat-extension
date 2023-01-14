import React from "react";
import NavButton from "./NavButton";

import './Navbar.css'

type Props = {
    section: any;
    onSection: any;
    onReject: any;
}

const Navbar = (props: Props) => {
    return (
        <div className="flex flex-row gap-1 justify-around">
            <NavButton onClick={() => props.onSection('transfer')}> Transfer </NavButton>
            <NavButton onClick={() => props.onSection('moreInfo')}> More Info </NavButton>
        </div>
    )
};

export default Navbar;