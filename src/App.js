import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import ConfirmAccount from "./components/ConfirmAccount"
import Login from "./components/Login"
import Register from "./components/Register";
import Profile from "./components/Profile";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import UserRecovery from './components/UserRecovery';
import ShowUser from "./components/ShowUser";
import Admin from "./components/Admin";
// managerment
import ShowCustomer from './components/ShowCustomer.js'
import ShowMentor from './components/ShowMentor.js'
import ShowStaff from './components/ShowStaff.js'
import ShowAdmin from './components/ShowAdmin.js'
// function
import Booking from './components/Booking.js'
import Blog from './components/Blog.js'
import Class from './components/Class.js'
import Course from './components/Course.js'
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login></Login>
    },
    {
        path: '/showCustomers',
        element: <ShowCustomer></ShowCustomer>
    },
    {
        path: '/showMentors',
        element: <ShowMentor></ShowMentor>
    },
    {
        path: '/showStaffs',
        element: <ShowStaff></ShowStaff>
    },
    {
        path: '/showAdmins',
        element: <ShowAdmin></ShowAdmin>
    },
    {
        path: '/admin',
        element: <Admin></Admin>
    },

    {
        path: '/showUser',
        element: <AuthorizeUser><ShowUser></ShowUser></AuthorizeUser>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/confirmAccount',
        element: <ConfirmAccount></ConfirmAccount>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path: '/userRecovery',
        element: <UserRecovery></UserRecovery>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },
    {
        path: '/booking',
        element: <Booking></Booking>
    },
    {
        path: '/class',
        element: <Class></Class>
    },
    {
        path: '/course',
        element: <Course></Course>
    },
    {
        path: '/blog',
        element: <Blog></Blog>
    },
])
export default function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>

    )
}