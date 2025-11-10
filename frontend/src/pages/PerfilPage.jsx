import { useState, useRef, useEffect } from "react";
import { useAuth } from "../api/authContext";
import { useNavigate } from "react-router-dom";
import Particles from "../components/Particles";
import { usePerfil } from "../data/usePerfil";

function PerfilPage() {
  const { usuario, getPerfil, perfil, getPerfilActivo } = useAuth();
  const { getPagos } = usePerfil(); // ✅ hook para verificar pago
  const navigate = useNavigate();

  const [newProfileName, setNewProfileName] = useState("");
  const [hoveredProfile, setHoveredProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [pagoValido, setPagoValido] = useState(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (usuario) {
      verificarPago(usuario.idUsuario);
    }
  }, [usuario]);

  const verificarPago = async (idUsuario) => {
    const data = await getPagos(idUsuario);
    const yaPago = data?.[0]?.yaPago || 0; // ✅ se accede directo al primer elemento
    console.log("Pago detectado:", yaPago);

    if (yaPago === 1) {
      setPagoValido(true);
      await getPerfil(idUsuario);
    } else {
      setPagoValido(false);
    }
  };


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

  const handleProfileClick = async (profile) => {
    if (!profile.idCuentaPerfil) {
      setEditingProfile({ tipo: "nuevo" });
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
      console.log("Agregar perfil:", newProfileName);
      setEditingProfile(null);
      setNewProfileName("");
    }
  };

  // ⏳ Si aún no sabemos si ha pagado
  if (pagoValido === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // ❌ Si no ha pagado, mostrar mensaje
  if (pagoValido === false) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <Particles
          count={{ sm: 200, lg: 700 }}
          intensity={{ sm: "low", lg: "medium" }}
          className="absolute inset-0 z-0"
        />
        <h2 className="text-3xl font-light mb-4">Tu suscripción ha expirado 💳</h2>
        <p className="text-gray-400 mb-8">
          Por favor renueva tu plan para continuar viendo contenido.
        </p>
        <button
          onClick={() => navigate("/Plan")}
          className="!bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-all"
        >
          Renovar Plan
        </button>
      </div>
    );
  }

  // ✅ Si ya pagó, mostrar los perfiles normalmente
  if (!perfil) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Cargando perfiles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <Particles
        count={{ sm: 200, lg: 700 }}
        intensity={{ sm: "low", lg: "medium" }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-white mb-6 tracking-wide">
            ¿Quién está viendo?
          </h1>
          <p className="text-gray-300 text-xl font-light">
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
                  className={`w-36 h-36 ${getColorFromId(profile.idCuentaPerfil)} rounded-2xl flex items-center justify-center text-5xl mb-4 border-2 border-white/20 transition-all duration-500 shadow-2xl ${hoveredProfile === profile.idCuentaPerfil
                    ? "scale-110 border-white"
                    : ""
                    } group-hover:scale-110 group-hover:border-white`}
                >
                  {profile.avatar || "👤"}
                </div>
                <span
                  className={`text-lg font-medium text-gray-300 transition-all duration-500 ${hoveredProfile === profile.idCuentaPerfil
                    ? "text-white scale-105"
                    : ""
                    } group-hover:text-white group-hover:scale-105`}
                >
                  {profile.nombre}
                </span>
              </div>
            </div>
          ))}

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
