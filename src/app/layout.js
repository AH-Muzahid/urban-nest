import { Manrope } from "next/font/google";
import Providers from "@/components/providers/Providers";
import ComparisonBar from "@/components/property/ComparisonBar";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "UrbanNest | Luxury Real Estate",
  description: "Discover curated luxury properties in the world's most desirable locations. Exclusivity meets architectural excellence.",
  keywords: "luxury real estate, premium properties, penthouses, villas, estates, luxury homes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body className={`${manrope.variable} font-display antialiased`}>
        <Providers>
          {children}
          <ComparisonBar />
        </Providers>
      </body>
    </html>
  );
}
