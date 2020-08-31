module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'app',
        },
    },
    devServer: {
        hot: true, liveReload: true
    }
}