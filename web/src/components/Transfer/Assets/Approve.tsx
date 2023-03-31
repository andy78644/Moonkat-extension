import React from "react"
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
    assetsApprove: Array<any>
    assetsOut: Array<any>
    gas: string
    gasPrice: string
}

const theme = createTheme({
    palette: {
        secondary: {
            main: '#B8463D',
        }
    },
});

const Approve = (props: Props) => {
    const { assetsApprove, assetsOut, gas, gasPrice } = props
    const gasFee = parseInt(gas, 16) * parseInt(gasPrice) * 10 ** (-9)
    return (
        <ThemeProvider theme={theme}>
            <Component sendTokens={assetsOut} gasFee={gasFee} mode="Assets Send" />
            <Component sendTokens={assetsApprove} gasFee={gasFee} mode="Assets Approve" />
        </ThemeProvider>
    )
};

export default Approve;