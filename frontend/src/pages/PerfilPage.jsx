import { useState, useRef, useEffect } from "react";
import { useAuth } from "../api/authContext";
import { useNavigate } from "react-router-dom";

function PerfilPage() {
  const { usuario, getPerfil, perfil, setPerfilActivo } = useAuth();
  const navigate = useNavigate();
  const [newProfileName, setNewProfileName] = useState("");
  const [hoveredProfile, setHoveredProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (usuario) {
      console.log("ID del usuario:", usuario.idUsuario);
      getPerfil(usuario.idUsuario);
    }
  }, [usuario]);

  const getColorFromId = (id) => {
    const colors = [
      "bg-gradient-to-br from-purple-600 to-pink-500",
      "bg-gradient-to-br from-blue-500 to-cyan-400",
      "bg-gradient-to-br from-green-500 to-emerald-400",
      "bg-gradient-to-br from-orange-500 to-red-500",
      "bg-gradient-to-br from-indigo-500 to-purple-400"
    ];
    return colors[id % colors.length];
  };

  const handleProfileClick = (profile) => {
    if (!profile.idCuentaPerfil) {
      // Es el botón de agregar
      setEditingProfile({ tipo: "nuevo" });
      console.log("nuevo");
    } else {
      // 🔥 SOLO GUARDAR idCuentaPerfil
      setPerfilActivo(profile); // Actualizar estado
      localStorage.setItem("perfilActivo", profile.idCuentaPerfil); // 🔥 Solo el ID
      console.log("Perfil activo guardado:", profile.idCuentaPerfil);
      navigate("/Catalogo");
    }
  };

  const handleAddProfile = () => {
    if (newProfileName.trim()) {
      // Aquí tu lógica para agregar perfil al backend
      console.log("Agregar perfil:", newProfileName);
      setEditingProfile(null);
      setNewProfileName("");
    }
  };

  if (!perfil) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-white mb-6 tracking-wide">
            ¿Quién está viendo?
          </h1>
          <p className="text-gray-300 text-xl font-light">
            Selecciona tu perfil para comenzar
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="flex justify-center gap-10 flex-wrap mb-16">
          {perfil.map((profile) => (
            <div
              key={profile.idCuentaPerfil}
              className="flex flex-col items-center transition-all duration-500"
              onMouseEnter={() => setHoveredProfile(profile.idCuentaPerfil)}
              onMouseLeave={() => setHoveredProfile(null)}
            >
              <div
                className="flex flex-col items-center cursor-pointer group relative"
                onClick={() => handleProfileClick(profile)}
              >
                {/* Avatar del perfil */}
                <div
                  className={`w-36 h-36 ${getColorFromId(profile.idCuentaPerfil)} rounded-2xl flex items-center justify-center text-5xl mb-4 border-2 border-white/20 transition-all duration-500 shadow-2xl ${
                    hoveredProfile === profile.idCuentaPerfil
                      ? "scale-110 border-white"
                      : ""
                  } group-hover:scale-110 group-hover:border-white`}
                >
                  {profile.avatar || "👤"}
                </div>

                {/* Nombre del perfil */}
                <span className={`text-lg font-medium text-gray-300 transition-all duration-500 ${
                  hoveredProfile === profile.idCuentaPerfil
                    ? "text-white scale-105"
                    : ""
                } group-hover:text-white group-hover:scale-105`}>
                  {profile.nombre}
                </span>
              </div>
            </div>
          ))}

          {/* Botón Agregar Perfil */}
          {editingProfile?.tipo === "nuevo" ? (
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center text-5xl mb-4 border-2 border-white/20">
                +
              </div>
              <div className="flex flex-col items-center space-y-3">
                <input
                  ref={nameInputRef}
                  type="text"
                  placeholder="Nombre del perfil"
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  className="bg-gray-800 border-2 border-gray-600 text-white px-3 py-2 rounded-lg text-sm w-32 text-center"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddProfile}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Crear
                  </button>
                  <button
                    onClick={() => setEditingProfile(null)}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => setEditingProfile({ tipo: "nuevo" })}
            >
              <div className="w-36 h-36 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center text-5xl mb-4 border-2 border-gray-500 transition-all duration-500 group-hover:border-white group-hover:scale-110">
                +
              </div>
              <span className="text-lg font-medium text-gray-400 group-hover:text-white transition-colors">
                Agregar Perfil
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center">
          <button className="border-2 border-gray-600 text-gray-400 hover:text-white hover:border-white px-8 py-3 text-lg transition-all duration-300 rounded-lg">
            Administrar perfiles
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilPage;