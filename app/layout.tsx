import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Word Punch 打卡",
  description: "手机端全屏单词小任务打卡应用，每天用 3 个微任务完成一个单词。",
  applicationName: "Word Punch",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Word Punch"
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
      <body>{children}</body>
    </html>
  );
}
