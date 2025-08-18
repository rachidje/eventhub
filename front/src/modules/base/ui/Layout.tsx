import { Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";

export const Layout: React.FC<{}> = () => {
    return (
            <>
                <CssBaseline />
                <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EVENT HUB
                    </Typography>
                    <Header />
                </Toolbar>
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Outlet />
                </Container>
            </>
        );
};