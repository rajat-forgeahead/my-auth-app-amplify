/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        asyncWebAssembly: true,
        buildHttp: true,
        layers: true,
        lazyCompilation: true,
        outputModule: true,
        syncWebAssembly: true,
        topLevelAwait: true,
      },
      
}

module.exports = nextConfig
