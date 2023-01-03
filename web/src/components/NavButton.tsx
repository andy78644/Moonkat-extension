import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick: () => void;
}

const NavButton = ({ children, onClick }: Props) => (
    <button className="px-2 py-1 bg-black text-white rounded" onClick={onClick}>
        {children}
    </button>
);

export default NavButton;