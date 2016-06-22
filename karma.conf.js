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
            'floatinglayer.css',
            'bower_components/tui-code-snippet/code-snippet.js',
            'bower_components/tui-domutil/domutil.js',
            'floatinglayer.js',
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
