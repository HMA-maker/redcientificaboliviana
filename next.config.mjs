/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true' && process.env.CUSTOM_DOMAIN !== 'true';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? '/redcientificaboliviana' : '',
  assetPrefix: isGithubPages ? '/redcientificaboliviana' : '',
  experimental: {
    agentUpgrade: 'security',
  },
};

export default nextConfig;
