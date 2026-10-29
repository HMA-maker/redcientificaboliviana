import fs from 'fs';

/** @type {import('next').NextConfig} */
const hasCname = fs.existsSync('./CNAME');
const isGithubPages = process.env.GITHUB_PAGES === 'true' && !hasCname;

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? '/redcientificaboliviana' : '',
  assetPrefix: isGithubPages ? '/redcientificaboliviana' : '',
};

export default nextConfig;
