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
      webpack: function (config, options) {
        console.log(options.webpack.version); // Should be webpack v5 now
        config.experiments = {
            appDir: true,
            topLevelAwait: true,
        };
        return config;
      },
}

module.exports = nextConfig
