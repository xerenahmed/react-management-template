import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import { CircularProgress, Typography } from '@mui/material';
import useAuthStore from '../../../store/auth.store';

const LogoutPage = () => {
    const setToken = useAuthStore((state) => state.setToken);
    useEffect(() => {
        setToken(null);
    }, []);
    return (
        <Box display={'flex'} gap={3} alignItems={'center'}>
            <Typography variant="h5">Logging out</Typography>
            <CircularProgress size={24} />
        </Box>
    );
};

export default LogoutPage;
