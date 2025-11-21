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
import Categoria from "../pages/ADMIN/Gestion_Contenido/Categoria";
import Genero from "../pages/ADMIN/Gestion_Contenido/Genero";
import Contenido from "../pages/ADMIN/Gestion_Contenido/Contenido";
import Temporada from "../pages/ADMIN/Gestion_Contenido/Temporadas";
import Videos from "../pages/ADMIN/Gestion_Contenido/Videos";
import Plan from "../pages/ADMIN/Gestion_Contenido/Plan";
import Usuario from "../pages/ADMIN/Gestion_Usuario/Usuario";
import Rol from "../pages/ADMIN/Gestion_Usuario/Rol";
import PlanesPage from "../pages/PlanesPage";
import CambiarPlanPage from "../pages/CambiarPlanPage";

function AppRoutes() {
    return (
        <Routes>
            {/* 🔓 Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Novedades" element={<NovedadesPage />} />
            <Route path="/Planes" element={<PlanesPage />} />

            <Route path="/CambiarPlan" element={
                <ProtectedRoute rolesPermitidos={[2]}>
                    <CambiarPlanPage />
                </ProtectedRoute>
            } />

            <Route path="/Categoria" element={
                <ProtectedRoute rolesPermitidos={[1]}>
                    <Categoria />
                </ProtectedRoute>
            } />
            <Route path="/Genero" element={
                <ProtectedRoute rolesPermitidos={[1]}>
                    <Genero />
                </ProtectedRoute>
            } />
            <Route path="/Contenido" element={
                <ProtectedRoute rolesPermitidos={[1]}>
                    <Contenido />
                </ProtectedRoute>
            } />
            <Route path="/Temporada" element={
                <ProtectedRoute rolesPermitidos={[1]}>
                    <Temporada />
                </ProtectedRoute>
            } />
            <Route path="/Video" element={
                <ProtectedRoute rolesPermitidos={[1]}>
                    <Videos />
                </ProtectedRoute>
            } />
            <Route path="/Plan" element={
                <ProtectedRoute rolesPermitidos={[1]}>
                    <Plan />
                </ProtectedRoute>
            } />
            <Route path="/Usuario" element={
                <ProtectedRoute rolesPermitidos={[1]}>
                    <Usuario />
                </ProtectedRoute>
            } />
            <Route path="/Rol" element={
                <ProtectedRoute rolesPermitidos={[1]}>
                    <Rol />
                </ProtectedRoute>
            } />

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