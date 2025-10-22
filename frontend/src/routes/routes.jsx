import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import VideoSection from "../pages/VideoSection";
import CatalogoPage from "../pages/CatalogoPage";
import ReproductorPage from "../pages/ReproductorPage";
import MangasPage from "../pages/MangasPages";
import MiListaPage from "../pages/MiListaPages";
import NovedadesPage from "../pages/NovedadesPages";
import MangaDetallePage from "../pages/MangaDetallePage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/video/:id" element={<ReproductorPage />} />
            <Route path="/Catalogo" element={<CatalogoPage />} />
            <Route path="/Mangas" element={<MangasPage />} />
            <Route path="/MiLista" element={<MiListaPage />} />
            <Route path="/Novedades" element={<NovedadesPage />} />
            <Route path="/manga/:id" element={<MangaDetallePage />} />
        </Routes>
    );
}

export default AppRoutes;
