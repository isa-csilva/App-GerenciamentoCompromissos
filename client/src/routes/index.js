import React from "react";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";
import PrivateRoute from "./privateRoute";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    exact path="/"
                    element={<Login/>}
                />
                <Route 
                    path="/home"
                    element={ <PrivateRoute><Home/></PrivateRoute>}
                />
            </Routes>
        </BrowserRouter>
    )
};

export default Rotas;