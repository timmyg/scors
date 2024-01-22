import { Providers } from "./providers";
import "./global.css";

export const metadata = {
  title: "Scors: Fast Sports Scores",
  description:
    "Scors is a fast sports scores app built with low bandwidth sitations in mind.",
};

import { Catamaran } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const catamaran = Catamaran({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={catamaran.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
