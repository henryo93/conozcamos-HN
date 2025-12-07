"use client";

import { useEffect, useState } from "react";
import { obtenerTrivia } from "../../servicios/catalogos";

export default function TriviaPage() {
  const [trivia, setTrivia] = useState<any[]>([]);

  useEffect(() => {
    async function cargar() {
      const data = await obtenerTrivia();
      console.log("ESTE ES EL ARCHIVO CORRECTO DE TRIVIA ✅");
      console.log("TRIVIAS RECIBIDAS:", data); 
      setTrivia(data);
    }
    cargar();
  }, []);

 return (
  <div>
    <div className="card" style={{ maxWidth: 520, margin: "2rem auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: "#4f46e5", marginBottom: 12 }}>Selecciona una Trivia</h1>
      <div style={{ display: "grid", gap: 10 }}>
        {trivia.map((t: any, idx: number) => (
          <a
            key={t.id ?? idx}
            href={`/general/configuracion?idTrivia=${t.id ?? idx}`}
            className="primary-btn"
            style={{ textAlign: "center" }}
          >
            {t.nombre}
          </a>
        ))}

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <a href="/general/inicio" className="secondary-link">Ir al Inicio</a>
        </div>
      </div>
    </div>
  </div>
);


}
