import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import VideoSection from "../pages/VideoSection";
import CatalogoPage from "../pages/CatalogoPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Video" element={<VideoSection />} />
                        <Route path="/Catalogo" element={<CatalogoPage />} />

        </Routes>
    );
}

export default AppRoutes;
