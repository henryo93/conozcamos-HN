import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <div className="card" style={{ maxWidth: 700, margin: "2.5rem auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: "#111827" }}>Conozcamos Honduras</h1>

        {/* Logo: coloca `logo.png` dentro de `public/` y se mostrará aquí */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <Image src="/logo.png" alt="Logo Conozcamos Honduras" width={96} height={96} priority />
        </div>

        <p style={{ color: "#6b7280", marginTop: 8 }}>Bienvenido. Elige una sección para comenzar:</p>

        <nav style={{ display: "grid", gap: 12, marginTop: 18 }}>
          <Link href="/general/registro" className="primary-btn" style={{ textAlign: "center" }}>
            📝 Registro
          </Link>

          <Link href="/general/login" className="primary-btn" style={{ textAlign: "center", background: "linear-gradient(90deg,#7c3aed,#06b6d4)" }}>
            🔐 Login
          </Link>
        </nav>
      </div>
    </div>
  );
}
