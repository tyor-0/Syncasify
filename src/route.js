import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import LandingPageLayout from './layouts/LandingPageLayout';
import LandingPage from './features/landing/LandingPage';
import Signin from './features/auth/Signin';
import Register from './features/auth/Register';
import AuthCompo from './features/auth/AuthCompo';
import DashboardLayout from './features/dashboard/DashboardLayout';
import Dashboard from './features/dashboard';


export function route(){
    return createBrowserRouter([
    {
        path: '/',
        Component: LandingPageLayout,
        children: [
            { index: true, Component: LandingPage },
         
        ]
    },

    {
        path: '/auth',
        Component: AuthCompo,
        children: [
            { index: true, Component: Signin },
            { path: 'signup', Component: Register },
           
        ]
    },

    {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
            { index: true, Component: Dashboard },
    //         { path: '/dashboard/products', Component: UsersProducts },
    //         { path: '/dashboard/add-product', Component: CreateProduct },
        ]
    },

    // {
    //     path: '/admin',
    //     Component: AdminLayout,
    //     children: [
    //         { index: true, Component: AdminLandingPage },
    //         { path: 'users', Component: Users },
    //         { path: 'products', Component: Products },
    //     ]
    // },
    
    // {
    //     path: '/staff',
    //     Component: StaffLayout,
    //     children: [
    //         { index: true, Component: StaffLandingPage },
    //         { path: 'users', Component: Users },
    //         { path: 'products', Component: Products },
    //     ]
    // },
    
]);
}
