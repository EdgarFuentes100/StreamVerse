import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import CatalogoPage from "../pages/CatalogoPage";
import ReproductorPage from "../pages/ReproductorPage";
import MangasPage from "../pages/MangasPages";
import MiListaPage from "../pages/MiListaPages";
import NovedadesPage from "../pages/NovedadesPages";
import MangaDetallePage from "../pages/MangaDetallePage";
import PerfilPage from "../pages/PerfilPage";

function AppRoutes() {
    return (
        <Routes>
            {/* 🔓 Todo público temporalmente */}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Perfil" element={<PerfilPage />} />
            <Route path="/Catalogo" element={<CatalogoPage />} />
            <Route path="/Mangas" element={<MangasPage />} />
            <Route path="/MiLista" element={<MiListaPage />} />
            <Route path="/Novedades" element={<NovedadesPage />} />
            <Route path="/manga/:id" element={<MangaDetallePage />} />
            <Route path="/video/:id" element={<ReproductorPage />} />
        </Routes>
    );
}

export default AppRoutes;
