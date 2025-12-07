import "./globals.css";

export const metadata = {
  title: "Conozcamos HN",
  description: "Juego de trivia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
        <body className="app-bg">
          {children}
        </body>
      </html>
  );
}
