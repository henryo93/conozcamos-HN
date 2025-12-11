"use client";

import { useState } from "react";
import { loginUsuario } from "../../servicios/auth";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const manejarLogin = async () => {
    setError(null);

    try {
      const data = await loginUsuario({
        correo,
        contrasenia: password,
      });

      // Guardar usuario en localStorage para usar en ranking o puntaje
      localStorage.setItem("usuario", JSON.stringify(data.data));

      router.push("/general/trivia");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div>
      <div className="card" style={{ maxWidth: 520, margin: "2rem auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#4f46e5" }}>Iniciar Sesión</h1>

        <div style={{ marginTop: 16 }}>
          <input
            className="form-input"
            type="email"
            placeholder="Correo"
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

          <button onClick={manejarLogin} className="primary-btn" style={{ width: "100%" }}>
            Entrar
          </button>

          {error && <p style={{ color: "#ef4444", marginTop: 12, textAlign: "center" }}>{error}</p>}

          <div style={{ marginTop: 12, textAlign: "center" }}>
            <a href="/general/registro" className="secondary-link">Ir a Registrarme</a>
          </div>
        </div>
      </div>
    </div>
  );
}
