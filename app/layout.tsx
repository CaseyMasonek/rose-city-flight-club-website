import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CssBaseline, Stack, Box } from "@mui/material";
import theme from "@/app/theme";
import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer";
import { Analytics } from "@vercel/analytics/next"

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
              <Analytics />
              <CssBaseline />
              <Box className={'m-5'} sx={{
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
          </ThemeProvider>
      </AppRouterCacheProvider>
      </body>
    </html>
  );
}
