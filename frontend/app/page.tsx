import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Conozcamos Honduras</h1>
        
        <p className="text-gray-600 mb-6">Bienvenido. Elige una sección para comenzar:</p>

        <nav className="flex flex-col gap-3">
          
          <Link href="/general/registro" className="block text-center bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">Registro</Link>
          
          <Link href="/general/login" className="block text-center bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700">Login</Link>
        
        </nav>

        
      </div>
    </div>
  );
}
