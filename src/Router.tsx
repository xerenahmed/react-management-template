import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './components';
import { LogoutPage, WelcomePage, LoginPage, ProductsPage } from './views';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <WelcomePage />,
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
