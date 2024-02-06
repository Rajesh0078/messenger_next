const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'vice.app', port: '', pathname: '/**/**/**' },
            { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com', port: '', pathname: '/**/**/**' },
        ],
    },
};

export default nextConfig;