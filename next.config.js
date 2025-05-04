/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')('./config/i18n.ts');
const { version } = require('./package.json');

const nextConfig = {
  publicRuntimeConfig: {
    version,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withNextIntl(nextConfig);
