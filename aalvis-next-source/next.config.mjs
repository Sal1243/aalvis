import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/wm-loader.ts",
    deviceSizes: [480, 640, 828, 1080, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 600],
  },
};

export default withNextIntl(nextConfig);
