import React from "react";
import { Component } from "./Component/Component";
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string
        }
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string
        }
    }
}
interface Props {
    sendTokens: Array<any>;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#509A57',
        }
    },
});

const Receive = (props: Props) => {
    const { sendTokens } = props;
    return (
        <ThemeProvider theme={theme}>
            <Component sendTokens={sendTokens} gasFee={0} mode="Assets Receive" />
        </ThemeProvider>
    )
}

export default Receive