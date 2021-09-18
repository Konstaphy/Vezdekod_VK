const path = require('path')
const htmlWPP = require('html-webpack-plugin')

module.exports = {
    entry: './client/client.js'
    ,
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'build')
    },
    mode: "production",
    module: {
        rules: [
            {
                test:/\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, //scss
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/[hash][ext][query]'
                }
            },
        ]
    },
    plugins: [
        new htmlWPP({
            template: path.join(__dirname, 'client/public/index.html')
        }),
    ],
    stats: 'errors-only',
    performance: {
        hints: false
    },
}