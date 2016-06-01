var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [

        'webpack-dev-server/client?http://localhost:4000',
        'webpack/hot/only-dev-server',
        './client-src/test/main.js'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        root: path.resolve('./client-src'), // must be absolute path
        extensions: ['', '.js']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,

                exclude: /node_modules/,

                loaders: [
                    'react-hot',
                    'babel?presets[]=react,presets[]=es2015'
                ]
            }
        ]
    }
};