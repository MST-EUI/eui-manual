module.exports = {
    devtool: 'cheap-module-eval-source-map',
    output: {
        publicPath: '/ewtbend/bend/index/',
    },
    dev: {
        output: {
            publicPath: '/',
        },
    },
    html: {
        template: './src/index.html'
    },
    babel: {
        plugins: [
            ["import", {
              "libraryName": "antd",
              "style": 'css'
            }]
        ]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    resolve: {
        alias: {
            'components': './src/components',
            '~': './src/',
        }
    },
    env: {
        '__DEV__': process.env.BUILD_ENV === 'dev',
        '__PROD__': process.env.BUILD_ENV === 'prod',
        '__PRE__': process.env.BUILD_ENV === 'pre',
        '__TEST__': process.env.BUILD_ENV === 'test',
        '__MOCK__': process.env.PROXY_ENV === 'mock',
    },
    proxy: {
        "/api": {
            target: "http://teacher.test.mistong.com/",
            changeOrigin: true,
            secure: false,
            // pathRewrite: {"^/api" : ""},
        },
        // login用于登录验证千万别去掉啊
        '/login': {
          target: 'http://www.test.mistong.com/',
          changeOrigin: true,
          secure: false,
        },
    },
    host: 'local.mistong.com',
    // host: '172.16.72.197' // use your host ip if try to debug with virtual box
    port: 8080,
    open: true,
    inline: true,
    autoPort:false
}
