import React, { ReactNode } from "react";

interface Props {
    // button
    children: ReactNode;
    onClick: () => void;

    // // props
    // buttonName: any;
    // buttonIcon: any;
}

const NavButton = ({ children, onClick }: Props) => (
    <button className="px-2 py-1 bg-black text-white rounded" onClick={onClick}>
        {children}
    </button>
);

export default NavButton;