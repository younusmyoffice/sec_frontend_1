/* eslint-disable */
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const dotenv = require("dotenv");
const fs = require("fs"); // to check if the file exists

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

const APP_DIR = path.resolve(__dirname, "../src");
const resolve = (dir) => path.join(__dirname, "../", dir);

module.exports = (env) => {
    const { PLATFORM, VERSION } = env;
    const isDev = PLATFORM === "local";

    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + "/.env";

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + "." + env.PLATFORM;
    // console.log(envPath);

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;
    // console.log(fs.existsSync(envPath), finalPath);

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;
    // console.log(fileEnv);

    // reduce it to a nice object, the same as before (but with the variables from the file)
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    const WebpackDefinePluginConfig = new webpack.DefinePlugin(envKeys);

    const CreateHtmlWebpackPluginConfig = ({ filename }) =>
        new HtmlWebpackPlugin({
            template: resolve("src/index.html"),
            favicon: resolve("src/favicon.ico"),
            inject: "body",
            filename,
        });

    const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
        filename: isDev ? "[name].css" : "[name].[hash].css",
        chunkFilename: isDev ? "[id].css" : "[id].[hash].css",
    });

    const CleanWebpackPluginConfig = new CleanWebpackPlugin({
        verbose: true,
        cleanStaleWebpackAssets: false,
    });

    return merge([
        {
            devServer: {
                static: {
                    directory: resolve("dist"),
                },
                historyApiFallback: true,
                port: 8000,
                open: true,
            },
            devtool: "source-map",
            entry: [APP_DIR],
            output: {
                filename: isDev ? "[name].js" : "[name].[hash].js",
                path: resolve("dist"),
                publicPath: "/",
                assetModuleFilename: "images/[name].[ext]",
            },
            resolve: {
                alias: {
                    _client: resolve("src"),
                    _assets: resolve("src/assets/"),
                },
                fallback: {
                    assert: require.resolve("assert/"), 
                    url: require.resolve("url/"), 
                    fs: require.resolve("browserify-fs"),  
                    stream: require.resolve("stream-browserify"),
                    crypto: require.resolve("crypto-browserify"),
                    constants: require.resolve("constants-browserify"),
                    vm: require.resolve("vm-browserify"),
                    os: require.resolve("os-browserify/browser")
                },
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: "babel-loader",
                        include: [resolve("src")],
                    },
                    {
                        test: /\.(scss|css)$/,
                        use: [
                            PLATFORM === "prod" || PLATFORM === "dev" || PLATFORM === "stage" 
                                ? MiniCssExtractPlugin.loader
                                : "style-loader",
                            "css-loader",
                            {
                                loader: "sass-loader",
                                options: {
                                    sassOptions: {
                                        silenceDeprecations: ['legacy-js-api'], // Line to add
                                    },
                                },
                            },
                        ],
                    },
                    {
                        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        loader: "url-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                            limit: 8192,
                            mimetype: "application/font-woff",
                        },
                    },
                    {
                        test: /\.(jpe?g|png|gif|ttf)$/,
                        type: "asset/resource",
                    },
                    {
                        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        use: [
                            {
                                loader: "@svgr/webpack",
                                options: {
                                    titleProp: true,
                                    name: "icons/[name].[ext]",
                                },
                            },
                            "file-loader",
                        ],
                    },
                ],
            },
            plugins: [
                CleanWebpackPluginConfig,
                WebpackDefinePluginConfig,
                MiniCssExtractPluginConfig,
                CreateHtmlWebpackPluginConfig({ filename: "index.html" }),
                new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|it/),
                new CopyWebpackPlugin({
                    patterns: [{ from: "src/static" }],
                }),
                // new GenerateSW({
                //     // these options encourage the ServiceWorkers to get in there fast
                //     // and not allow any straggling "old" SWs to hang around
                //     clientsClaim: true,
                //     skipWaiting: true,
                //     swDest: path.resolve(__dirname, "../src/serviceWorker.js"),
                // }),
                WebpackDefinePluginConfig,
            ],
            performance: {
                hints: false,
            },
        },
    ]);
};
