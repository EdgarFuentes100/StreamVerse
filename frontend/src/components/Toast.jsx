import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function Toast({ tipo = "success", mensaje, onClose }) {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClosing(true); // activa animación de salida
            setTimeout(onClose, 300); // espera animación
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return ReactDOM.createPortal(
        <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 
            z-[99999] transition-all duration-300
            ${closing ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}
        >
            <div
                className={`
                    px-6 py-3 rounded-xl shadow-lg text-center text-white font-semibold
                    backdrop-blur-md
                    ${tipo === "success" ? "bg-green-600/90" : "bg-red-600/90"}
                `}
            >
                {mensaje}
            </div>
        </div>,
        document.body
    );
}
