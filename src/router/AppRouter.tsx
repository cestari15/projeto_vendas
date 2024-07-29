import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import PaginaHome from "../components/PaginaHome";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/home" element={<PaginaHome />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;