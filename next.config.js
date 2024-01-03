/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
      },
      webpack(config,options) {
        config.experiments = { ...config.experiments, topLevelAwait: true }
        config.module.rules.push({
            test: /\.mdx/,
            use: [
              options.defaultLoaders.babel,
              {
                loader: '@mdx-js/loader',
              },
            ],})
        return config
      },
      
}

module.exports = nextConfig
