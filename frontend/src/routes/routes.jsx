// src/routes/routes.jsx
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
import { ProtectedRoute } from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            {/* 🔓 Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<LoginPage />} />

            {/* 🔒 Ruta de selección de perfil - SOLO para rol 2 */}
            <Route path="/Perfil" element={
                <ProtectedRoute rolesPermitidos={[2]}> {/* ✅ Solo rol 2 */}
                    <PerfilPage />
                </ProtectedRoute>
            } />

            {/* 🔒 Rutas protegidas - TODOS los autenticados pero rol 2 necesita perfil */}
            <Route path="/Catalogo" element={
                <ProtectedRoute> {/* ✅ Rol 1 accede directo, Rol 2 necesita perfil */}
                    <CatalogoPage />
                </ProtectedRoute>
            } />
            <Route path="/Mangas" element={
                <ProtectedRoute>
                    <MangasPage />
                </ProtectedRoute>
            } />
            <Route path="/MiLista" element={
                <ProtectedRoute>
                    <MiListaPage />
                </ProtectedRoute>
            } />
            <Route path="/Novedades" element={
                <ProtectedRoute>
                    <NovedadesPage />
                </ProtectedRoute>
            } />
            <Route path="/manga/:id" element={
                <ProtectedRoute>
                    <MangaDetallePage />
                </ProtectedRoute>
            } />
            <Route path="/video/:id" element={
                <ProtectedRoute>
                    <ReproductorPage />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default AppRoutes;