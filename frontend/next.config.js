const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_ENV: "PRODUCTION", //your next configs goes here
  },
});
