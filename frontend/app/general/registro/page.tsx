"use client";

import { useState } from "react";
import { registrarUsuario } from "@/servicios/auth";

export default function RegistroPage() {
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const manejarRegistro = async () => {
    setMensaje(null);
    setError(null);

    try {
      const data = await registrarUsuario({
        correo,
        apodo: usuario,
        contrasenia: password,
      });

      setMensaje(data.msg);
      
    } catch (err: any) {
      setError(err.message || "Error al registrar");
    }
  };

  return (
    <div>
      <div className="card" style={{ maxWidth: 520, margin: "2rem auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#4f46e5" }}>Crear Cuenta</h1>

        <div style={{ marginTop: 16 }}>
          <input
            className="form-input"
            type="text"
            placeholder="Nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{ marginBottom: 12 }}
          />
          <input
            className="form-input"
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{ marginBottom: 12 }}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 12 }}
          />

          <button onClick={manejarRegistro} className="primary-btn" style={{ width: "100%" }}>
            Registrarme
          </button>

          {mensaje && <p style={{ color: "#10b981", marginTop: 12, textAlign: "center" }}>{mensaje}</p>}
          {error && <p style={{ color: "#ef4444", marginTop: 12, textAlign: "center" }}>{error}</p>}

          <div style={{ marginTop: 12, textAlign: "center" }}>
            <a href="/general/login" className="secondary-link">Ir a Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
