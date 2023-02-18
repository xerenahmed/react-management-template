import React, { FC } from 'react';
import { Box, Button, CircularProgress, Fade, FormControl, InputAdornment, TextField, Typography } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { AccountCircle, Key } from '@mui/icons-material';
import API from '../../../services/api';
import useAuthStore from '../../../store/auth.store';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

const LoginPage: FC = () => {
    const setToken = useAuthStore((state) => state.setToken);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            return API.login(values.email, values.password)
                .then((response) => {
                    if (response.status === 401) {
                        actions.setFieldError('password', 'Invalid credentials.');
                        return;
                    }
                    if (response.status === 200) {
                        setToken(response.data.data);
                        console.log(response.data.data);
                        return;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    actions.setFieldError('password', error.message);
                });
        },
    });
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '96vh',
            }}
        >
            <FormControl
                sx={{ gap: 4, width: { xs: '100%', md: '300px' }, paddingTop: { md: '13%' } }}
                component={'form'}
                onSubmit={formik.handleSubmit}
            >
                <Typography variant={'h3'} fontWeight={300}>
                    EA Studios
                </Typography>
                <TextField
                    type="text"
                    name="email"
                    label="Mail"
                    placeholder="Mail adress"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Key />
                            </InputAdornment>
                        ),
                    }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button variant="contained" type={'submit'} sx={{ paddingY: 2 }} disabled={formik.isSubmitting}>
                    Login
                    <Fade in={formik.isSubmitting}>
                        <CircularProgress color="inherit" size={24} sx={{ marginLeft: 2 }} />
                    </Fade>
                </Button>
            </FormControl>
        </Box>
    );
};

export default LoginPage;
