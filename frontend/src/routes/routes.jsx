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

function AppRoutes() {
    return (
        <Routes>
            {/* 🔓 Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Novedades" element={<NovedadesPage />} />


            <Route path="/Categoria" element={<Categoria />} />
            <Route path="/Genero" element={<Genero />} />
            <Route path="/Contenido" element={<Contenido />} />
            <Route path="/Temporada" element={<Temporada />} />
            <Route path="/Video" element={<Videos />} />
            <Route path="/Plan" element={<Plan />} />

            <Route path="/Usuario" element={<Usuario />} />
            <Route path="/Rol" element={<Rol />} />


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