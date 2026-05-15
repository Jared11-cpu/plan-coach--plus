import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.plancoach.wordpunch",
  appName: "Word Punch",
  webDir: "out",
  bundledWebRuntime: false,
  backgroundColor: "#211f1c",
  android: {
    webContentsDebuggingEnabled: false
  }
};

export default config;
