import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Find Your Next Era — Dell Technologies Black Friday',
  description:
    'A conversational Black Friday experience. Discover the era you\'re stepping into and the technology that will take you there.',
  openGraph: {
    title: 'Find Your Next Era',
    description: 'Discover your next era with Dell Technologies.',
    siteName: 'Dell Technologies',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0A0A0F] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
