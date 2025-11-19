import { useState, useRef, useEffect } from "react";
import { useAuth } from "../api/authContext";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { usePerfil } from "../data/usePerfil";
import PlanesCarousel from "./PlanesCarousel";

function PerfilPage() {
  const { usuario, getPerfil, perfil, getPerfilActivo } = useAuth();
  const { getPagos, crearPerfil } = usePerfil();
  const navigate = useNavigate();

  const [newProfileName, setNewProfileName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("👤");
  const [hoveredProfile, setHoveredProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [pagoValido, setPagoValido] = useState(null);
  const [maxPerfiles, setMaxPerfiles] = useState(0);
  const nameInputRef = useRef(null);

  const avatares = ["👤", "😊", "🎮", "🌟", "🦄", "🐱", "🦁", "🐶", "🦊", "🐼", "🎯", "🎨", "⚽", "🎸", "🎭"];

  const reVerificarPago = async () => {
    console.log("Re-verificando pago después de pago exitoso...");
    if (usuario) {
      await verificarPago(usuario.idUsuario);
    }
  };

  const verificarPago = async (idUsuario) => {
    try {
      const data = await getPagos(idUsuario);
      const infoPago = data?.[0];

      console.log("Pago detectado:", infoPago);

      if (infoPago?.yaPago === 1) {
        setPagoValido(true);
        setMaxPerfiles(infoPago.maxPerfil || 1);
        await getPerfil(idUsuario);
      } else {
        setPagoValido(false);
      }
    } catch (error) {
      console.error("Error verificando pago:", error);
      setPagoValido(false);
    }
  };

  useEffect(() => {
    if (usuario) {
      verificarPago(usuario.idUsuario);
    }
  }, [usuario]);

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
    if (!profile.idCuentaPerfil) {
      setEditingProfile({ tipo: "nuevo" });
      setNewProfileName("");
      setSelectedAvatar("👤");
      console.log("nuevo");
    } else {
      const idPerfilActivo = await getPerfilActivo(profile.idCuentaPerfil);
      if (idPerfilActivo) {
        navigate("/Catalogo");
      }
    }
  };

  const handleAddProfile = () => {
    if (newProfileName.trim()) {
      const body = {
        idCuenta: usuario.idCuenta,
        nombre: newProfileName.trim(),
        avatar: selectedAvatar
      };

      crearPerfil(body);
      getPerfil(usuario.idUsuario);
      setEditingProfile(null);
      setNewProfileName("");
      setSelectedAvatar("👤");
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  if (pagoValido === null) {
    return (
      <div className="min-h-screen !bg-black flex items-center justify-center !text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 !border-purple-500"></div>
      </div>
    );
  }

  if (pagoValido === false) {
    return <PlanesCarousel onPagoExitoso={reVerificarPago} />;
  }

  if (!perfil) {
    return (
      <div className="min-h-screen !bg-black flex items-center justify-center !text-white">
        Cargando perfiles...
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
                      disabled={!newProfileName.trim()}
                      className="!bg-green-500 hover:!bg-green-600 disabled:!bg-gray-600 disabled:cursor-not-allowed !text-white px-4 py-2 rounded text-sm transition-all"
                    >
                      Crear Perfil
                    </button>
                    <button
                      onClick={() => {
                        setEditingProfile(null);
                        setSelectedAvatar("👤");
                      }}
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
                onClick={() => setEditingProfile({ tipo: "nuevo" })}
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