import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components';
import { LogoutPage, MainPage, LoginPage, ProductsPage } from './views';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <MainPage />,
            },
            {
                path: '/products',
                element: <ProductsPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/logout',
                element: <LogoutPage />,
            },
        ],
    },
]);

export default Router;
