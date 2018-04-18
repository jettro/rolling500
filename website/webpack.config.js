var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

module.exports = function (env) {
    return {
        devtool: 'cheap-module-source-map',
        entry: [
            'react-hot-loader/patch',
            './index.tsx'
        ],
        output: {
            path: path.resolve(__dirname, 'target/classes/public'),
            publicPath: '/',
            filename: '[hash].[name].js'
        },
        context: path.resolve(__dirname, 'src'),
        resolve: {
            extensions: ['.ts', '.tsx', '.js', 'json', '.jsx']
        },
        module: {
            loaders: [
                {
                    test: /\.(ts|tsx)$/,
                    use: [
                        {
                            loader: 'react-hot-loader/webpack'
                        },
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                transpileOnly: true // This disables type checking. Enable again when material-ui types are available
                            }
                        }
                    ],
                    exclude: ["node_modules"]
                },
                {
                    test: /\.css$/,
                    loader: ['style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
                inject: true,
                template: 'index.html'
            }),
            new webpack.DefinePlugin({
                'process.env.API_URL': JSON.stringify((env === 'prod') ? 'https://rolling500.luminis.amsterdam' : 'http://localhost:8080')
            })
        ],
        devServer: {
            contentBase: [path.join(__dirname, "target/classes/public"), path.join(__dirname, 'public')],
            compress: true,
            port: 9000,
            historyApiFallback: true
        }
    }
};