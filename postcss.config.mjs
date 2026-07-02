const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
export default config;
