/* rollup默认无法加载外部依赖，引入该插件即可打包外部依赖，此处打包d3 */
import resolve from 'rollup-plugin-node-resolve'
/* 开启本地服务插件 */
import serve from 'rollup-plugin-serve'
/* 构建index.html，将打包后文件汇总到文件中 */
import html from 'rollup-plugin-html2'
/* 热重载插件，与watch不同，他可以自动刷新浏览器 */
import livereload from 'rollup-plugin-livereload'

export default {
    input: './src/main.js',
    output: {
        file: './dist/bundle.js',
        format: 'umd'
    },
    plugins: [
        resolve(),
        serve({
            contentBase: 'dist'
        }),
        livereload(),
        html({
            template: './index.html'
        })
    ]
}
