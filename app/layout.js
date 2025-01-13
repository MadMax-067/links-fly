import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from '@next/font/google';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ['latin'], // Specify the subset (e.g., latin)
  weight: ['400', '700'], // Use specific font weights
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Links Fly - Your trusted URL Shortner",
  description: "Shorten the Links on the Go",
};

export default function RootLayout({ children }) {
  return (
    <html data-theme='dark' lang="en">
      <body
        className={`${poppins.className} antialiased absolute top-0 z-[-2] min-h-fit h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
