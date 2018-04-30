const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssExtractTextPlugin = new ExtractTextPlugin("[name].css");
const htmlExtractTextPlugin = new ExtractTextPlugin("[name].html");


module.exports = {
    entry: './public/jsMvc/application.js',

    output: {
        filename: 'application.js',
        path: `${__dirname}/dist/out/`
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.css', '.scss', '.html']
    },

    module: {
        rules: [
            {
                test: /\.xml$/,
                use: {
                    loader: 'fest-webpack-loader'
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                },
                exclude: /(node_modules|bower_components)/
            },

            {
                test: /\.css$/,
                loader: cssExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
            {
                test: /\.scss$/,
                loader: cssExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"})
            },

            {
                test: /\.html$/,
                loader: htmlExtractTextPlugin.extract({fallback: "html-loader", use: "html-loader"})
            },
        ],

    },

    plugins: [
        cssExtractTextPlugin, htmlExtractTextPlugin
    ],
};