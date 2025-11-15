export const metadata = {
  title: "Repairo",
  description: "Report damaged items and match with trusted repair services.",
};

import "./globals.css";
import ToasterClient from "../components/ToasterClient";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToasterClient />
        {children}
      </body>
    </html>
  );
}
