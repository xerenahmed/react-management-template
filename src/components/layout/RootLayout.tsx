import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const RootLayout: FC = () => {
    return (
        <>
            <Box sx={{ position: { xs: 'block', md: 'fixed' }, width: { xs: 'auto', md: '260px' }, left: 0, top: 0 }}>
                <Sidebar />
            </Box>

            <Box
                sx={{
                    width: { md: 'calc(100vw - 260px)' },
                    left: { md: '260px' },
                    position: { md: 'relative' },
                }}
            >
                <Container sx={{ paddingTop: 3 }}>
                    <Outlet />
                </Container>
            </Box>
        </>
    );
};

export default RootLayout;
