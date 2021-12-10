var webpack = require( 'webpack' );
var path = require( 'path' );

module.exports = {
    entry:'./api.js',
    output: {
        path: path.resolve( __dirname, './build/' ),
        filename: 'build.js'
    },
    module: {
        rules: []
    },
    resolve: {
        extensions: ['.js', '.ts' ]
    },
    target: 'node',
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    externals: [
        { mongoose: 'commonjs mongoose' },
        { express: 'commonjs express' },
    ]
}