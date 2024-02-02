/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            // ... Other rewrites
            {
                source: '/api/socket',
                destination: '/api/socket',
            },
        ];
    },

};

export default nextConfig;
