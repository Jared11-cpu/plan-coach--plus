import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plan Coach Plus",
  description: "Plan Coach Plus 手机端全屏任务打卡应用，把目标变成一张张可完成的行动卡。",
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
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#211f1c"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <Script id="capacitor-mobile-entry" strategy="beforeInteractive">
          {`
            (function () {
              var isCapacitor = Boolean(window.Capacitor);
              var isCapacitorLocalHost = window.location.hostname === "localhost";
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
