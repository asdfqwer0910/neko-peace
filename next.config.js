/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['zsajvdudroadhfjizhya.supabase.co'],
    },
}

module.exports = nextConfig
