import type { NextConfig } from "next";

// Statik dışa aktarım: site herhangi bir sunucuda (veya paylaşılabilir bağlantıda) çalışır.
// GitHub Pages alt klasörde yayınlandığında BASE_PATH ile derlenir (ör. /merdo-mobilya-demo)
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
