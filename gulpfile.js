const gulp = require('gulp');
// 压缩 https://www.npmjs.com/package/gulp-uglify
const uglify = require('gulp-uglify');
// 合并 https://www.npmjs.com/package/gulp-concat
const concat = require('gulp-concat');
// 创建启动服务 https://www.npmjs.com/package/gulp-connect
const connect = require('gulp-connect');
const header = require('gulp-header');
//清理缓存 https://www.npmjs.com/package/gulp-clean
const clean = require('gulp-clean')
//分文件执行事件 https://github.com/aseemk/requireDir
const requireDir = require('require-dir');

const pkg = require("./package.json");


const banner =
    `/**
* name: ${ pkg.name }
* author: ${ pkg.author }
* copyright: ${pkg.copyright}
* links: ${ pkg.links }
*/\n`;
//定义文件夹用作前缀
let _BC = "./bower_components/";


/***************************************************************/

let dir = requireDir('./gulp_tasks');

//clean
gulp.task('clean', () => {
    "use strict";
    return gulp.src(['dist/js/*.js', 'dist/js/**/*.js', 'dist/css/*.css'])
        .pipe(clean({read: false}));
});

// 创建任务
gulp.task('connect', () => {
    return connect.server({
        // port: 8888,
        root: './dist', //配置访问根目录
        livereload: true //是使用热加载
    });
});
//将静态文件拷贝到对应的文件夹如 不要压缩的 html 图片 文档等资源
gulp.task('copy', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'));
});
//热加载html
gulp.task('html', () => {
    return gulp.src('./dist/*.html')
        .pipe(connect.reload());
});
//合并
gulp.task('concat-js-lib', () => {
    return gulp.src([
        _BC + 'jquery/dist/jquery.min.js',
        _BC + 'angular/angular.min.js'
        // , _BC + 'oclazyload/dist/oclazyload.min.js'
        , _BC + 'angular-ui-router/release/angular-ui-router.min.js'
        // , _BC + 'moment/min/moment-with-locales.min.js'
        // , _BC + 'lodash/dist/lodash.min.js'

    ])
        .pipe(concat('lib.js'))
        .pipe(header(banner))
        .pipe(gulp.dest('./dist/js/lib/'))
});
gulp.task('js', () => {
    "use strict";
    return gulp.src("./src/js/*.js")
    //.pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});
//监视程序
gulp.task('watch', () => {
    gulp.watch(['./src/js/*.js'], ['js']);
    gulp.watch(['./src/*.html'], ['copy']);
    gulp.watch(['./dist/*.html'], ['html']); //如果html变化，就调用html任务重加载页面html
});
//执行
gulp.task('default', ['connect', 'watch']);

//构建基本骨架如lib 及 assets
gulp.task('build-lib', ['concat-js-lib']);

//发布release 版本最新特性构建
gulp.task('release', []);

//发布publish版本
gulp.task('publish', []);
