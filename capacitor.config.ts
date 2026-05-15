import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.plancoach.plus",
  appName: "Plan Coach Plus",
  webDir: "out",
  backgroundColor: "#211f1c",
  server: {
    androidScheme: "https"
  },
  android: {
    webContentsDebuggingEnabled: false
  }
};

export default config;
