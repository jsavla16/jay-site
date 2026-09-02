/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // The three tools pages were merged into /tools. These are permanent (308)
  // rather than temporary so search engines transfer rather than split — the
  // old paths are gone for good, not parked.
  async redirects() {
    return [
      { source: "/finance-tools", destination: "/tools", permanent: true },
      { source: "/prompting-tools", destination: "/tools", permanent: true },
      { source: "/marketing-tools", destination: "/tools", permanent: true },
    ];
  },
};

export default nextConfig;
