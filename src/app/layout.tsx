import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "LMS Auth",
  description: "Authentication & Enrollment with Firebase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar is a client component */}
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
