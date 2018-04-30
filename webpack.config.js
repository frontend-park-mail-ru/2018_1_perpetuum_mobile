const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
        application: './public/jsMvc/application.js'
    },

    output: {
        filename: 'application.js',
        path: `${__dirname}/public/dist/out/`
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
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
            },

            {
                test: /\.html$/,
                loader: ExtractTextPlugin.extract({fallback: 'html-loader', use: 'html-loader'})
            },
            {
                test: /\.(png|woff(2)?|eot|ttf|svg)([a-z0-9=.]+)?$/,
                loader: 'file-loader'
            }
        ],

    },

    plugins: [
        new ExtractTextPlugin('style.css')
    ],
};