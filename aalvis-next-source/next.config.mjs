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
    // Widths must match Wikimedia's allowed thumbnail steps — the custom
    // loader (src/lib/wm-loader.ts) snaps anything else and non-standard
    // widths are rejected with HTTP 400 since T414805.
    deviceSizes: [330, 500, 960, 1280, 1920],
    imageSizes: [20, 40, 60, 120, 250],
  },
};

export default withNextIntl(nextConfig);
