import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth.store';
import { SIDEBAR } from '../../utils/constants';
import Sidebar from './Sidebar';

const RootLayout: FC = () => {
    const location = useLocation();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated && !['/login'].includes(location.pathname)) {
        return <Navigate to={'/login'} replace />;
    }

    if (isAuthenticated && ['/login'].includes(location.pathname)) {
        return <Navigate to={'/'} replace />;
    }

    return (
        <>
            {isAuthenticated && (
                <Box
                    sx={{
                        position: { xs: 'block', md: 'fixed' },
                        width: { xs: 'auto', md: SIDEBAR.width },
                        left: 0,
                        top: 0,
                    }}
                >
                    <Sidebar />
                </Box>
            )}

            <Box
                sx={
                    isAuthenticated
                        ? {
                              width: { md: `calc(100vw - ${SIDEBAR.width})` },
                              left: { md: SIDEBAR.width },
                              position: { md: 'relative' },
                          }
                        : undefined
                }
            >
                <Container sx={{ paddingTop: 3 }}>
                    <Outlet />
                </Container>
            </Box>
        </>
    );
};

export default RootLayout;
