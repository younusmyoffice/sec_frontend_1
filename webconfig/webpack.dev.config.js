/* eslint-disable */
const { merge } = require("webpack-merge");
// Configs
const baseConfig = require("./webpack.config");

const devConfiguration = () => {
    return merge([
        {
            optimization: {
                splitChunks: {
                    chunks: "all",
                },
            },
        },
    ]);
};

module.exports = (env) => {
    return merge(baseConfig(env), devConfiguration(env));
};
