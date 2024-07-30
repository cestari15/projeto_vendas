import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import PaginaHome from "../components/PaginaHome";
import Navbar from "../components/Header";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/home" element={<PaginaHome />} />
            <Route path="/navbar" element={<Navbar/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;