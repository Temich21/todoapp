/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(mp3|wav|mpe?g|ogg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next/static/sounds/',
                        outputPath: 'static/sounds/',
                    },
                },
            ],
        });

        return config;
    },
}

module.exports = nextConfig
