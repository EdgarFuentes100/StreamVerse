import { useCallback } from "react";

function useFetch() {
  const urlBase = "http://localhost:4000/api/v1/";

  const manejarRespuesta = async (response) => {
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    let payload = null;

    try {
      payload = isJson ? await response.json() : await response.text();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const mensaje = (payload && (payload.mensaje || payload.message)) || "Error en el servidor";
      return { ok: false, datos: null, mensaje, status: response.status };
    }

    return {
      ok: true,
      datos: payload && payload.datos ? payload.datos : payload,
      mensaje: payload?.mensaje || null,
      status: response.status,
    };
  };

  const getFetch = useCallback((urlParcial) => {
    const token = localStorage.getItem("tokenPerfil"); // 🔹 tomar token del perfil activo
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    return fetch(urlBase + urlParcial, {
      method: "GET",
      headers,
      credentials: "include",
    }).then(manejarRespuesta);
  }, [urlBase]);

  const postFetch = useCallback((urlParcial, datos) => {
    const token = localStorage.getItem("tokenPerfil"); 
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    return fetch(urlBase + urlParcial, {
      method: "POST",
      headers,
      body: JSON.stringify(datos),
      credentials: "include",
    }).then(manejarRespuesta);
  }, [urlBase]);

  // Igual para PUT y DELETE
  const putFetch = (urlParcial, datos) => {
    const token = localStorage.getItem("tokenPerfil");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    return fetch(urlBase + urlParcial, {
      method: "PUT",
      headers,
      body: JSON.stringify(datos),
      credentials: "include",
    }).then(manejarRespuesta);
  };

  const deleteFetch = (urlParcial) => {
    const token = localStorage.getItem("tokenPerfil");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    return fetch(urlBase + urlParcial, {
      method: "DELETE",
      headers,
      credentials: "include",
    }).then(manejarRespuesta);
  };

  return { getFetch, postFetch, putFetch, deleteFetch };
}

export { useFetch };
