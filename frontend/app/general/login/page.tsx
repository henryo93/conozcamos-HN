"use client";

import { useState } from "react";
import { loginUsuario } from "@/servicios/auth";

export default function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const manejarLogin = async () => {
    setError(null);

    try {
      const data = await loginUsuario({
        correo,
        contrasenia: password,
      });

      // Guardar usuario en localStorage para usar en ranking o puntaje
      localStorage.setItem("usuario", JSON.stringify(data.data));

      window.location.href = "/general/trivias";
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
        <div className="w-full max-w-lg bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Iniciar Sesión</h1>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <input
            className="p-3 rounded-lg border"
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <input
            className="p-3 rounded-lg border"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={manejarLogin}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Entrar
          </button>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <a href="/general/registro" className="text-center text-blue-600 hover:underline mt-4">
            Ir a Registrarme
          </a>
        </div>
        </div>
      </div>
  );
}
