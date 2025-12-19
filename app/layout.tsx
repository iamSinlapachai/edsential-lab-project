import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavigationBar";
import AOSAnimate from "@/components/aos-animate";
import EdIcon from "@/assets/icon/EdsentialLab.png";
import { ThemeProvider } from "@/components/theme-provider";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Edsential Lab - Career Roadmaps and Learning Resources",
  description:
    "Edsential Lab is your gateway to comprehensive career roadmaps and curated learning resources, designed to empower your journey in the tech world.",
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "darkreader-lock": "true",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${prompt.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <AOSAnimate />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
