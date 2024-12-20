import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "universeAGH",
  description: "universal map of AGH University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
