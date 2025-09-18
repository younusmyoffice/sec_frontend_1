/* eslint-disable */
/* eslint-disable */
const { merge } = require("webpack-merge");
// Plugins
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// Configs
const baseConfig = require("./webpack.config");

const prodConfiguration = (env) => {
    return merge([
        {
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            test: /\/node_modules\//,
                            name: "vendor",
                            chunks: "all",
                        },
                    },
                },
                minimize: true,
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            compress: {
                                drop_console: true,
                            },
                            output: {
                                comments: false,
                            },
                            sourceMap: true,
                        },
                        parallel: true,
                    }),
                ],
            },
            plugins: [
                new BundleAnalyzerPlugin({
                    analyzerMode: "static",
                    openAnalyzer: false,
                }),
            ],
        },
    ]);
};

module.exports = (env) => {
    return merge(baseConfig(env), prodConfiguration(env));
};
