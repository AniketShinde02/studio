import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Caption Generator',
  description: 'Unleash viral captions in seconds—made for Gen Z.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-primary/10 text-primary py-2 text-sm font-semibold">
            <div className="container mx-auto px-4">
                <div className="overflow-hidden">
                    <div className="flex items-center animate-marquee whitespace-nowrap">
                        <AlertTriangle className="h-4 w-4 mr-3 shrink-0" />
                        <p className="mr-12">Disclaimer: Uploaded images are NOT stored permanently and will be auto-deleted 15 minutes after upload.</p>
                        <AlertTriangle className="h-4 w-4 mr-3 shrink-0" />
                         <p className="mr-12">Disclaimer: Uploaded images are NOT stored permanently and will be auto-deleted 15 minutes after upload.</p>
                    </div>
                </div>
            </div>
          </div>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}