import React from "react";
import { Navbar } from "./layout/nav/Navbar";
import Body from "./layout/content/Body";
import Login from "./feature/auth/login/Login";
import Register from "./feature/auth/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleDestination from "./layout/content/SingleDestination";
import Booking from "./layout/content/Booking";
import Logout from "./feature/auth/login/Logout";
import Profile from "./feature/auth/login/Profile";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/singledestination/:id" element={<SingleDestination />} />
                    <Route path="/booking/:id" element={<Booking />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Body />} />
                </Routes>
            </BrowserRouter>

        </>
    );
};

export default App;
