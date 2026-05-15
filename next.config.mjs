/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isCapacitor = process.env.CAPACITOR === "true";
const repoName = "plan-coach--plus";

const nextConfig = {
  reactStrictMode: true,
  output: isGitHubPages || isCapacitor ? "export" : undefined,
  basePath: isGitHubPages ? `/${repoName}` : undefined,
  assetPrefix: isGitHubPages ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

export default nextConfig;
