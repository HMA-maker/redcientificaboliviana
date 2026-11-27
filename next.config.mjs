/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true' && process.env.CUSTOM_DOMAIN !== 'true';
const basePath = isGithubPages ? '/redcientificaboliviana' : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    agentUpgrade: 'security',
  },
};

export default nextConfig;
