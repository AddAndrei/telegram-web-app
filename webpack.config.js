const path = require('path')

module.exports = {
    entry: './src/index.js', // Your main entry point
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Output filename
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Apply to JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel loader
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    mode: 'development', // Set to 'production' for production builds
}