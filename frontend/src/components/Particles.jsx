import React, { useState, useEffect } from "react";

function Particles({ count = { sm: 200, lg: 150 }, intensity = { sm: "low", lg: "medium" }, className }) {
    const [screenSize, setScreenSize] = useState("lg"); // por defecto lg

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setScreenSize("sm");
            else setScreenSize("lg");
        };

        handleResize(); // inicial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const actualCount = typeof count === "object" ? count[screenSize] : count;
    const actualIntensity = typeof intensity === "object" ? intensity[screenSize] : intensity;

    const opacityMap = { low: 0.3, medium: 0.6, high: 1 };
    const opacity = opacityMap[actualIntensity] || 0.6;

    const colors = [
        `rgba(14,203,255,${opacity})`,
        `rgba(139,92,246,${opacity})`,
        `rgba(236,72,153,${opacity})`,
    ];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {Array.from({ length: actualCount }).map((_, i) => {
                const size = Math.random() * 3 + 1;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = Math.random() * 5 + 5;
                const color = colors[Math.floor(Math.random() * colors.length)];

                return (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${left}%`,
                            top: `${top}%`,
                            backgroundColor: color,
                            animation: `floaty ${duration}s ease-in-out ${delay}s infinite alternate`,
                        }}
                    />
                );
            })}

            <style>{`
        @keyframes floaty {
          0% { transform: translateY(0) translateX(0); opacity: 0.5; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
          100% { transform: translateY(0) translateX(0); opacity: 0.5; }
        }
      `}</style>
        </div>
    );
}

export default Particles;
