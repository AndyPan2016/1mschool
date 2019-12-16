var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var bs_reload = require('browser-sync').reload;
var runSequence = require('run-sequence');


/**
 * Gulp Plugins
 * 
 * gulp-concat
 * gulp-imagemin
 * gulp-less
 * gulp-less-plugin-autoprefix
 * gulp-load-plugins
 * gulp-rename
 * gulp-rev
 * gulp-rev-replace
 * gulp-sequence : gulp task invoke queues
 * gulp-clean : remove all build files
 * gulp-html-replace : auto import .css .js files
 * 
 * @authors guoba (neo_z@outlook.com)
 * @date 2018年5月21日17时9分
 */


var isServing = false;

var PATHS = {
    _SRC_: './src/',
    _DIST_: './dist/',
    _PRE_BUILD_: './dist/.build/',
    _BUILD_: './build/'
};

var Config = {
    html: {
        src: PATHS._SRC_ + 'page/**/*.html',
        dist: PATHS._DIST_
    },
    css: {
        src: PATHS._SRC_ + 'css/**/*.css',
        dist: PATHS._DIST_ + 'assets/css/',
        prebuild: PATHS._DIST_ + '.build/assets/css/',
    },
    less: {
        src: [PATHS._SRC_ + 'less/*.less', "!" + PATHS._SRC_ + 'less/_*.less'],
        dist: PATHS._DIST_ + 'assets/css/'
    },
    scripts: {
        src: PATHS._SRC_ + 'scripts/**/*.js',
        dist: PATHS._DIST_ + 'assets/scripts/',
        prebuild: PATHS._DIST_ + '.build/assets/scripts/',
        build: PATHS._BUILD_ + 'assets/scripts/',
    },
    img: {
        src: PATHS._SRC_ + 'images/**/*',
        dist: PATHS._DIST_ + 'assets/images/'
    },
    font: {
        src: PATHS._SRC_ + 'fonts/**/*',
        dist: PATHS._DIST_ + 'assets/fonts',
    }
}

/**
 * js 操作
 */
gulp.task('js:concat-core', function () {
    return gulp.src(PATHS._SRC_ + 'scripts/core/*.js')
        .pipe($.changed(Config.scripts.dist, { hasChanged: $.changed.compareSha1Digest }))
        .pipe($.concat('core.js'))
        .pipe(gulp.dest(Config.scripts.dist));
})

gulp.task('js:concat-plugins', function () {
    return gulp.src(PATHS._SRC_ + 'scripts/plugins/**/*')
        .pipe(gulp.dest(Config.scripts.dist+'plugins/'))
})

gulp.task('js:concat-vendor', function () {
    return gulp.src(PATHS._SRC_ + 'scripts/vendor/*.js')
        .pipe($.changed(Config.scripts.dist, { hasChanged: $.changed.compareSha1Digest }))
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest(Config.scripts.dist));
})

gulp.task('js:hash', function () {
    return gulp.src([PATHS._DIST_ + 'assets/**/*.js'])
        .pipe($.rev())
        .pipe(gulp.dest(PATHS._PRE_BUILD_ + '/assets/'))
        .pipe($.rev.manifest({
            path: PATHS._PRE_BUILD_ + 'rev-manifest.json',
            merge: true
        }))
        .pipe(gulp.dest('./'));
})

gulp.task('js:min', function () {
    return gulp.src(Config.scripts.build + "*.js")
        .pipe($.removelogs())
        .pipe($.uglify())
        .pipe(gulp.dest(Config.scripts.build))
});

gulp.task('js:move', ['js:concat-core', 'js:concat-plugins', 'js:concat-vendor'], function () {
    return gulp.src(PATHS._SRC_ + 'scripts/pages/*.js')
        .pipe($.changed(Config.scripts.dist+'pages/', { hasChanged: $.changed.compareSha1Digest }))
        .pipe(gulp.dest(Config.scripts.dist+'pages/'));
});

function jsMoveByPath(path) {
    gulp.src(path)
        .pipe(gulp.dest(Config.scripts.dist+'pages/'))
        .pipe(bs_reload({ stream: true }));
}

/**
 * less,css操作
 */
/*gulp.task('less', function () {
    return gulp.src(['./src/less/*.less', '!./src/less/_*.less']) //多个文件以数组形式传入  
        .pipe($.changed(Config.css.dist, { hasChanged: $.changed.compareSha1Digest }))
        .pipe($.less()) //编译less文件  
        .pipe($.cleanCss()) //压缩新生成的css  
        .pipe(gulp.dest(Config.css.dist)) //将会在css下生成main.css  
        .pipe(bs_reload({ stream: true }));
})*/


gulp.task('less:watch', function () {
    $.watch(Config.less.src).on("change", function (file) {
        gulp.src(file)
            .pipe($.less())
            .pipe($.autoprefixer({
                browsers: ['last 2 versions', 'Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],
                cascade: true,
                remove: true
            }))
            .pipe($.px2rem({ 
                rootValue: 40,
                unitPrecision: 5,
                replace: true,
                mediaQuery: false
            }))
            .pipe(gulp.dest(PATHS._SRC_ + 'css'))
            .pipe(bs_reload({ stream: true }));
    });
})

gulp.task("less:concat-base", function () {
    return gulp.src(
        [PATHS._SRC_ + 'less/base.*.less'])
        .pipe($.less()) //编译less文件  
        .pipe($.cleanCss()) //压缩新生成的css
        .pipe($.px2rem({ 
            rootValue: 40,
            unitPrecision: 5,
            replace: true,
            mediaQuery: false
        }))
        .pipe($.concat('base.css'))
        .pipe(gulp.dest(Config.css.dist)); //将会在css下生成main.css  
})

gulp.task("less:concat-plugins", function () {
    return gulp.src([PATHS._SRC_ + 'less/plugin.*.less', PATHS._SRC_ + 'less/vendor.*.less'])
        .pipe($.changed(Config.css.dist, { hasChanged: $.changed.compareSha1Digest }))
        .pipe($.removelogs())
        .pipe($.less()) //编译less文件  
        .pipe($.cleanCss()) //压缩新生成的css
        .pipe($.concat('plugins.css'))
        .pipe(gulp.dest(Config.css.dist)) //将会在css下生成main.css  
})

gulp.task("less:concat-page", function () {
    return gulp.src([PATHS._SRC_ + 'less/page.*.less'])
        .pipe($.changed(Config.css.dist, { hasChanged: $.changed.compareSha1Digest }))
        .pipe($.removelogs())
        .pipe($.less())
        .pipe($.px2rem({ 
            rootValue: 40,
            unitPrecision: 5,
            replace: true,
            mediaQuery: false
        }))
        .pipe($.cleanCss()) //压缩新生成的css
        .pipe(gulp.dest(Config.css.dist));
})

gulp.task('less:concat', function () {
    runSequence(['less:concat-base', 'less:concat-plugins', 'less:concat-page']);
});

gulp.task('css:hash', function () {

    return gulp.src([PATHS._DIST_ + 'assets/**/*.css'])
        .pipe($.rev())
        .pipe(gulp.dest(PATHS._PRE_BUILD_ + '/assets/'))
        .pipe($.rev.manifest({
            path: PATHS._PRE_BUILD_ + 'rev-manifest.json',
            merge: true
        }))
        .pipe(gulp.dest('./'));
})

function lessMoveByPath(path) {
    gulp.src(path)
        .pipe($.removelogs())
        .pipe($.less()) //编译less文件  
        .pipe($.cleanCss()) //压缩新生成的css
        .pipe(gulp.dest(Config.css.dist)) //将会在css下生成main.css  
        .pipe(bs_reload({ stream: true }))
}


/** 
 * 图片操作
 */
gulp.task('image:move', function () {
    return gulp.src(Config.img.src)
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(Config.img.dist))
        .pipe(bs_reload({
            stream: true
        }));
});

gulp.task('image:move-build', function () {
    return gulp.src(Config.img.dist + '**/*')
        .pipe(gulp.dest(PATHS._BUILD_ + '/assets/images/'))
});
/**
 * fonts操作
 */
gulp.task('font:move', function () {
    return gulp.src(Config.font.src)
        .pipe(gulp.dest(Config.font.dist));
})

gulp.task('font:move-build', function () {
    return gulp.src(Config.font.dist + '**/*')
        .pipe(gulp.dest(PATHS._BUILD_ + '/assets'));
})

//font text slimming
gulp.task('font:slimming', function () {
    return gulp.src('src/fonts/*.ttf')
        .pipe($.fontmin({
            text: '0123456789,.',
        }))
        .pipe(gulp.dest('dist/fonts'));
})


/**
 * html操作
 */
//HTML压缩
gulp.task('html:minify', function () {
    const options = {
        removeComments: false, //清除HTML注释
        collapseWhitespace: false, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };

    return gulp.src(PATHS._DIST_ + "/*.html")
        .pipe($.htmlmin(options))
        .pipe(gulp.dest(PATHS._BUILD_));
})

gulp.task('html:rev', function () {
    return gulp.src(['./dist/.build/rev-manifest.json', './dist/**/*.html'])
        .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
        .pipe($.revCollector({
            replaceReved: true,
            dirReplacements: {
                '/': '/'
            }
        }))
        .pipe(gulp.dest('./build'));
})

gulp.task('html:move', function () {
    return gulp.src([Config.html.src, '!'+PATHS._SRC_+"page/include/*.html"])
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(PATHS._DIST_));
})

function htmlMoveByPath(path) {
    var regExp = /[\\//]src[\\//]page[\\//](.*[\\//]*.html)/;
    var regPaths = regExp.exec(path);
    var filePath = regPaths.length > 1 ? regPaths[1]:"";
    
    var subIndex = filePath.indexOf("/")>-1 ? filePath.indexOf("/"):filePath.indexOf("\\");

    filePath = filePath.substr(0, subIndex);

    gulp.src(path)
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(PATHS._DIST_ + filePath))
        .pipe(bs_reload({stream:true}));
}


/** 
 * 清除文件夹及文件
 */
gulp.task('clean:all', function () {
    return gulp.src(['./dist', './dist/.build', './build'])
        .pipe($.clean());
})

gulp.task('clean:dist', function () {
    return gulp.src('./dist')
        .pipe($.clean());
})

gulp.task('clean:build', function () {
    return gulp.src(['./dist/.build', './build'])
        .pipe($.clean());
})

//#输出命令代码
gulp.task('server', function () {
    var watchFiles = [
        PATHS._DIST_ + "/**/*.html",
        PATHS._DIST_ + "/**/*.css",
        PATHS._DIST_ + "/**/*.js"
    ];

    browserSync.init(watchFiles, {
        server: {
            baseDir: PATHS._DIST_
        },
        port: 8888
    });

    $.watch(Config.less.src)
        .on('add', function () {
            runSequence('less:concat');
        })
        .on('change', function (filename) {
            if(filename.indexOf("base.")>-1){
                runSequence('less:concat-base');
            }else if(filename.indexOf('plugin.')>-1){
                runSequence('less:concat-plugins');
            }else if(filename.indexOf('page.')>-1){
                runSequence('less:concat-page')
                // lessMoveByPath(filename);
            }else{
                runSequence('less:concat');
            }
        });

    $.watch(Config.font.src)
        .on('add', function () {
            runSequence('font:move');
        })
        .on('change', function () {
            runSequence('font:move');
        });

    $.watch(Config.img.src)
        .on('add', function () {
            runSequence('image:move');
        })
        .on('change', function () {
            runSequence('image:move');
        });

    $.watch(Config.scripts.src)
        .on('add', function () {
            runSequence('js:move');
        })
        .on('change', function (filename) {
            jsMoveByPath(filename);
        });

    $.watch(Config.html.src)
        .on('add',function(filename) {
            htmlMoveByPath(filename)        
        })
        .on('change', function (filename) {
            htmlMoveByPath(filename)
        })

    isServing = true;
})

gulp.task('default', ['dev']);

//输出测试环境
gulp.task('dev', function (cb) {
    runSequence(
        'clean:dist', ['less:concat', 'font:move', 'image:move', 'js:move', 'html:move'],
        'server', cb
    )
})

//输出生产环境
gulp.task('build:assets', function () {
    // return gulp.src([PATHS._DIST_ + 'assets/**/*', PATHS._DIST_ + '**/*.html'])
    //     .pipe(gulp.dest(PATHS._BUILD_ + 'assets'));
        gulp.src([PATHS._DIST_ + 'assets/**/*'])
            .pipe(gulp.dest(PATHS._BUILD_ + 'assets'));

        gulp.src([PATHS._DIST_ + '**/*.html'])
            .pipe(gulp.dest(PATHS._BUILD_ ));
});

gulp.task('build', function () {
    //runSequence('clean:build', ['css:hash', 'js:hash'], 'build:assets', 'image:move-build', 'font:move-build', ['js:min', 'html:rev']);
    runSequence('clean:build', 'build:assets');
});

gulp.task('clean', ['clean:all']);