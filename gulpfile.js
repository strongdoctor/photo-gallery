var gulp = require('gulp'),
    shell = require('gulp-shell')

gulp.task('default', () => {
    console.log('Hello, gulp.')
})

gulp.task('git:pull', shell.task(
    "git pull origin master"
))

gulp.task('install:front', [ 'git:pull' ], shell.task(
    "cd front && sudo npm ci"
))

gulp.task('install:back', [ 'git:pull' ], shell.task(
    "cd back && sudo npm ci"
))

gulp.task('build', [ 'install:back', 'install:front' ], shell.task(
    "cd front && npm run build"
))

gulp.task('publish', [ 'build' ], shell.task(
    "sudo cp -r front/build /var/www/html/photo-gallery/front"
))
