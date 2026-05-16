import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plan Coach Web",
  description: "高级 AI 计划教练网页，把目标变成行动，把行动变成证据。",
  applicationName: "Plan Coach Plus",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Plan Coach Plus"
  },
  formatDetection: {
    telephone: false
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8fafc"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <Script id="capacitor-mobile-entry" strategy="beforeInteractive">
          {`
            (function () {
              var isCapacitor = Boolean(window.Capacitor);
              var isCapacitorLocalHost = window.location.protocol === "https:" && window.location.hostname === "localhost";
              var path = window.location.pathname.replace(/\\/+$/, "");
              if ((isCapacitor || isCapacitorLocalHost) && (path === "" || path === "/")) {
                window.location.replace("/mobile/");
              }
            })();
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
