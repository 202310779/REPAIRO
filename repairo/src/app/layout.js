export const metadata = {
  title: 'Repairo',
  description: 'Report damaged items and match with trusted repair services.',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
