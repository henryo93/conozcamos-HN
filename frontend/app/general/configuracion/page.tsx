"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  obtenerDificultades,
  obtenerModalidades,
} from "../../servicios/catalogos";

export default function ConfiguracionPage() {
  const searchParams = useSearchParams();
  const idTrivia = Number(searchParams.get("idTrivia"));

  // ✅ Validación correcta
  if (!idTrivia || isNaN(idTrivia)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-red-600">
          ❌ Trivia no válida. Regresa y selecciona una trivia.
        </p>
      </div>
    );
  }

  const [dificultades, setDificultades] = useState<any[]>([]);
  const [modalidades, setModalidades] = useState<any[]>([]);

  const [idDificultad, setIdDificultad] = useState<number | null>(null);
  const [idModalidad, setIdModalidad] = useState<number | null>(null);

  useEffect(() => {
    async function cargarDatos() {
      const dif = await obtenerDificultades();
      const mod = await obtenerModalidades();
      setDificultades(dif);
      setModalidades(mod);
    }
    cargarDatos();
  }, []);

  const iniciar = () => {
    if (!idDificultad || !idModalidad) {
      return alert("Selecciona dificultad y modalidad");
    }

    window.location.href = `/general/juego?idTrivia=${idTrivia}&idDificultad=${idDificultad}&idModalidad=${idModalidad}`;
  };

  return (
    <div>
      <div className="card" style={{ maxWidth: 520, margin: "2rem auto" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#4f46e5", marginBottom: 12 }}>Configuración de Juego</h1>

        <div style={{ display: "grid", gap: 12 }}>
          <div>
            <label style={{ fontWeight: 700 }}>Dificultad</label>
            <select
              className="form-input"
              onChange={(e) => {
                const v = Number(e.target.value);
                setIdDificultad(isNaN(v) || v === 0 ? null : v);
              }}
              style={{ marginTop: 8 }}
            >
              <option value="">-- Seleccionar --</option>
              {dificultades.map((d) => (
                <option key={d.id ?? d.nombre} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 700 }}>Modalidad</label>
            <select
              className="form-input"
              onChange={(e) => {
                const v = Number(e.target.value);
                setIdModalidad(isNaN(v) || v === 0 ? null : v);
              }}
              style={{ marginTop: 8 }}
            >
              <option value="">-- Seleccionar --</option>
              {modalidades.map((m) => (
                <option key={m.id ?? m.nombre} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <button onClick={iniciar} className="primary-btn" style={{ width: "100%" }}>
            Iniciar Trivia
          </button>

          <div style={{ textAlign: "center", marginTop: 8 }}>
            <a href="/general/trivia" className="secondary-link">Volver</a>
          </div>
        </div>
      </div>
    </div>
  );
}
