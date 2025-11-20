import { useState, useRef, useEffect } from "react";
import { useAuth } from "../api/authContext";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { usePerfil } from "../data/usePerfil";

function PerfilPage() {
  const {
    usuario,
    getPerfil,
    perfil,
    getPerfilActivo,
    maxPerfiles
  } = useAuth();

  const { crearPerfil } = usePerfil();
  const navigate = useNavigate();

  const [newProfileName, setNewProfileName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("👤");
  const [hoveredProfile, setHoveredProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef(null);

  const avatares = ["👤", "😊", "🎮", "🌟", "🦄", "🐱", "🦁", "🐶", "🦊", "🐼", "🎯", "🎨", "⚽", "🎸", "🎭"];

  useEffect(() => {
    getPerfil(usuario.idUsuario);
  }, []);

  const getColorFromId = (id) => {
    const colors = [
      "!bg-gradient-to-br !from-purple-600 !to-pink-500",
      "!bg-gradient-to-br !from-blue-500 !to-cyan-400",
      "!bg-gradient-to-br !from-green-500 !to-emerald-400",
      "!bg-gradient-to-br !from-orange-500 !to-red-500",
      "!bg-gradient-to-br !from-indigo-500 !to-purple-400"
    ];
    return colors[id % colors.length];
  };

  const handleProfileClick = async (profile) => {
    if (loading) return;

    if (!profile.idCuentaPerfil) {
      if (perfil.length >= maxPerfiles) {
        alert("Ya alcanzaste el límite de perfiles de tu plan.");
        return;
      }

      setEditingProfile({ tipo: "nuevo" });
      setNewProfileName("");
      setSelectedAvatar("👤");
      return;
    }

    setLoading(true);
    try {
      const idPerfilActivo = await getPerfilActivo(profile.idCuentaPerfil);
      if (idPerfilActivo) {
        navigate("/Catalogo");
      }
    } catch (error) {
      console.error("Error al activar perfil:", error);
      alert("Error al seleccionar el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProfile = async () => {
    if (!newProfileName.trim()) {
      alert("Por favor ingresa un nombre para el perfil");
      return;
    }

    setLoading(true);
    try {
      const body = {
        idCuenta: usuario.idCuenta,
        nombre: newProfileName.trim(),
        avatar: selectedAvatar
      };

      await crearPerfil(body, usuario.idUsuario, getPerfil);
      setEditingProfile(null);
      setNewProfileName("");
      setSelectedAvatar("👤");
    } catch (error) {
      console.error("Error creando perfil:", error);
      alert("Error al crear el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleCancelCreate = () => {
    setEditingProfile(null);
    setNewProfileName("");
    setSelectedAvatar("👤");
  };

  // Estados de carga
  if (loading) {
    return (
      <div className="min-h-screen !bg-black flex items-center justify-center !text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 !border-purple-500"></div>
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="min-h-screen !bg-black flex items-center justify-center !text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 !border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen !bg-gradient-to-br !from-slate-900 !via-purple-900 !to-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 !bg-black opacity-40"></div>
      <Particles
        count={{ sm: 200, lg: 700 }}
        intensity={{ sm: "low", lg: "medium" }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light !text-white mb-6 tracking-wide">
            ¿Quién está viendo?
          </h1>
          <p className="!text-gray-300 text-xl font-light">
            Selecciona tu perfil para comenzar
          </p>
        </div>

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
                <div
                  className={`w-36 h-36 ${getColorFromId(profile.idCuentaPerfil)} rounded-2xl flex items-center justify-center text-5xl mb-4 !border-2 !border-white/20 transition-all duration-500 shadow-2xl ${hoveredProfile === profile.idCuentaPerfil
                    ? "scale-110 !border-white"
                    : ""
                    } group-hover:scale-110 group-hover:!border-white`}
                >
                  {profile.avatar || "👤"}
                </div>
                <span
                  className={`text-lg font-medium !text-gray-300 transition-all duration-500 ${hoveredProfile === profile.idCuentaPerfil
                    ? "!text-white scale-105"
                    : ""
                    } group-hover:!text-white group-hover:scale-105`}
                >
                  {profile.nombre}
                </span>
              </div>
            </div>
          ))}

          {perfil.length < maxPerfiles ? (
            editingProfile?.tipo === "nuevo" ? (
              <div className="flex flex-col items-center">
                <div className="w-36 h-36 !bg-gradient-to-br !from-gray-600 !to-gray-700 rounded-2xl flex items-center justify-center text-5xl mb-4 !border-2 !border-white/20">
                  {selectedAvatar}
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <input
                    ref={nameInputRef}
                    type="text"
                    placeholder="Nombre del perfil"
                    value={newProfileName}
                    onChange={(e) => setNewProfileName(e.target.value)}
                    className="!bg-gray-800 !border-2 !border-gray-600 !text-white px-3 py-2 rounded-lg text-sm w-40 text-center"
                    autoFocus
                    maxLength={15}
                  />

                  <div className="bg-gray-800/80 p-3 rounded-lg">
                    <p className="!text-gray-300 text-sm mb-2">Selecciona un avatar:</p>
                    <div className="grid grid-cols-5 gap-2 max-w-xs">
                      {avatares.map((avatar, index) => (
                        <button
                          key={index}
                          onClick={() => handleAvatarSelect(avatar)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-200 ${selectedAvatar === avatar
                            ? "!bg-purple-500 scale-110 !border-2 !border-white"
                            : "!bg-gray-700 hover:!bg-gray-600"
                            }`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddProfile}
                      disabled={!newProfileName.trim() || loading}
                      className="!bg-green-500 hover:!bg-green-600 disabled:!bg-gray-600 disabled:cursor-not-allowed !text-white px-4 py-2 rounded text-sm transition-all"
                    >
                      {loading ? "Creando..." : "Crear Perfil"}
                    </button>
                    <button
                      onClick={handleCancelCreate}
                      disabled={loading}
                      className="!bg-gray-600 hover:!bg-gray-500 !text-white px-4 py-2 rounded text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleProfileClick({})}
              >
                <div className="w-36 h-36 !bg-gradient-to-br !from-gray-600 !to-gray-700 rounded-2xl flex items-center justify-center text-5xl mb-4 !border-2 !border-gray-500 transition-all duration-500 group-hover:!border-white group-hover:scale-110">
                  +
                </div>
                <span className="text-lg font-medium !text-gray-400 group-hover:!text-white transition-colors">
                  Agregar Perfil
                </span>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center !text-gray-400 mt-6">
              <div className="w-36 h-36 !bg-gray-700 rounded-2xl flex items-center justify-center text-4xl mb-4 opacity-60">
                🚫
              </div>
              <span className="text-lg">Límite de perfiles alcanzado</span>
            </div>
          )}
        </div>

        <div className="text-center">
          <button className="!border-2 !border-gray-600 !text-gray-400 hover:!text-white hover:!border-white px-8 py-3 text-lg transition-all duration-300 rounded-lg">
            Administrar perfiles
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilPage;