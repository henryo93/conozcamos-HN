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
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Crear Cuenta</h1>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <input
            className="p-3 rounded-lg border"
            type="text"
            placeholder="Nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            className="p-3 rounded-lg border"
            type="email"
            placeholder="Correo electrónico"
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
            onClick={manejarRegistro}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Registrarme
          </button>

          {mensaje && <p className="text-green-600 text-center">{mensaje}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          <a href="/general/login" className="text-center text-blue-600 hover:underline mt-4">
            Ir a Login
          </a>
        </div>
      </div>
    </div>
  );
}
