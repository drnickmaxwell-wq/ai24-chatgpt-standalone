/** @type {import('next').NextConfig} */
const nextConfig = {
  // Good defaults
  reactStrictMode: true,
  experimental: { appDir: true },

  // You’re on static export somewhere. This disables the server Image API so the 500 disappears.
  images: {
    unoptimized: true,
  },

  // If you see `output: 'export'` anywhere, it belongs here. If you are exporting statically, keep this line.
  // If you're NOT exporting statically, remove this next line completely.
  // output: 'export',
};

module.exports = nextConfig;
