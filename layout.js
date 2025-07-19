// app/layout.js
import "./globals.css";

export const metadata = {
  title: "MidJourney Prompt Builder",
  description: "Prompt Builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="antialiased bg-gray-100 min-h-screen text-gray-900">
        {children}
      </body>
    </html>
  );
}
