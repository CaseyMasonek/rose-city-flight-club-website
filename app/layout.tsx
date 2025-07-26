import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CssBaseline, Stack, Box } from "@mui/material";
import theme from "@/app/theme";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rose City Flight Club",
  description: "Rose City Flight Club",
};

export const experimental_ppr = true

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800`}
      >
      <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box sx={{
                  m: 5,
                  display: "flex",
                  flexDirection: 'column',
                  minHeight: '96vh',
              }}>
                  <Header />
                  <Box sx={{
                      flexGrow: 1,
                      p: 3
                  }}>
                      {children}
                  </Box>
                  <Footer />
              </Box>
              <Analytics />
              <SpeedInsights />
          </ThemeProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
