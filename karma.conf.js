module.exports = function(config) {
    config.set({
        colors: true,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity,
        logLevel: config.LOG_INFO,
        frameworks: [
            'jasmine',
            'fixture'
        ],
        files: [
            'dist/floatingLayer.css',
            'node_modules/babel-polyfill/dist/polyfill.js',
            'bower_components/tui-code-snippet/code-snippet.js',
            'bower_components/tui-dom/dist/domutil.js',
            'dist/floatingLayer.js',
            'test/*.js'
        ],
        reporters: [
            'dots',
            'junit'
        ],
        junitReporter: {
            outputDir: 'reports/junit',
            suite: ''
        },
        browsers: [
            'Chrome'
        ]
    });
};
