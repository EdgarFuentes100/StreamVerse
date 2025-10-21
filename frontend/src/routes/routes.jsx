import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import VideoSection from "../pages/VideoSection";
import CatalogoPage from "../pages/CatalogoPage";
import ReproductorPage from "../pages/ReproductorPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/video/:id" element={<ReproductorPage />} />
            <Route path="/Catalogo" element={<CatalogoPage />} />

        </Routes>
    );
}

export default AppRoutes;
