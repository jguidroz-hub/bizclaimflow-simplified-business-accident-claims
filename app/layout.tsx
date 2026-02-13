import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BizClaimFlow - Simplified Business Accident Claims',
  description: 'Value Proposition: Streamlines the complex and frustrating process of managing insurance claims and compensation for businesses after accidents or damages, reducing administrative burden, improving claim accuracy, and accelerating payout times for small to medium enterprises.

Target Customer: Small and medium-sized businesses (SMBs) across various industries (e.g., logistics, construction, retail) that frequently deal with property, vehicle, or employee accident claims.

---
Category: Micro-SaaS
Target Market: Small and medium-sized businesses (SMBs) across various industries (e.g., logistics, construction, retail) that frequently deal with property, vehicle, or employee accident claims.
Source Hypothesis ID: 76747614-9635-42f3-be3d-39f63fa56df0
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">BizClaimFlow - Simplified Business Accident Claims</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
