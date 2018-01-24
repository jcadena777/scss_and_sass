// import dependencies
import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';

const server = browserSync.create();

// setting browser sync

function reload(done) {
  server.reload();
  done();
};

function serve(done) {
  server.init({
    server: {
      baseDir: './public'
    }
  });
  done();
};


// setting paths
const scss_path = {
  scripts: {
    src: './dev/scss/*.scss',
    dest: './public/css/'
  }
};
const html_path = {
  scripts: {
    src: './dev/html/*.html',
    dest: './public/html/'
  }
};
const index_path = {
  scripts: {
    src: './dev/*.html',
    dest: './public/'
  }
};

// gulp task
function scss() {
  return gulp.src(scss_path.scripts.src, {
      sourcemaps: true
    })
    .pipe(sass())
    .pipe(gulp.dest(scss_path.scripts.dest));
};

function html() {
  return gulp.src(html_path.scripts.src, {
      sourcemaps: true
    })
    .pipe(gulp.dest(html_path.scripts.dest));
};

function index() {
  return gulp.src(index_path.scripts.src, {
      sourcemaps: true
    })
    .pipe(gulp.dest(index_path.scripts.dest));
};

//watching
const watch_scss = () => gulp.watch(scss_path.scripts.src, gulp.series(scss, reload));
const watch_html = () => gulp.watch(html_path.scripts.src, gulp.series(html, reload));
const watch_index = () => gulp.watch(index_path.scripts.src, gulp.series(index, reload));

const dev = gulp.parallel(serve, watch_scss, watch_html, watch_index);
export default dev;








// OLD GULP FORMAT

//gulp.task('sass', () => {
//  gulp.src('./dev/scss/*.scss')
//    .pipe(sass())
//    .pipe(gulp.dest('./public/css'))
//    .pipe(server.stream({
//      match: '**/*.css'
//    }));
//});

/*
gulp.task('index', () => {
  gulp.src('./dev/*.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('html', () => {
  gulp.src('./dev/html/*.html')
    .pipe(gulp.dest('./public/html'));
});

gulp.task('scss-watch', ['sass'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('html-watch', ['html'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('index-watch', ['index'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('default', ['sass', 'html', 'index'], () => {

  server.init({
    server: {
      baseDir: "./public"
    }
  });
*/
//gulp.watch(".dev/scss/*.scss", ['scss-watch']);
//gulp.watch(".dev/html/*.html", ['html-watch']);
//gulp.watch(".dev/*.html", ['index-watch']);
//gulp.watch('./dev/scss/**/*.scss', gulp.series('sass', server.reload));
//gulp.watch('./dev/html/**/*.html', gulp.series('html', server.reload));
//gulp.watch('./dev/**/*.html', gulp.series('index', server.reload));
//});