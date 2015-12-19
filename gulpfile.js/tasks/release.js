'use strict';

/**
 * @param  {Object}  gulp    The gulp object
 * @param  {Object}  config  The configuration for gulp tasks. To get a property using `config.a.b.c` or `config.get('a.b.c')`
 * @param  {Object}  LL      Lazy required libraries and other data
 * @param  {Object}  args    The parsed arguments from comment line
 */
module.exports = function(gulp, config, LL, args) {  // eslint-disable-line no-unused-vars
    gulp.task('release:license', ['clean:release'], function() {
        var license = LL.license;
        var conf = config.get('tasks.release.license');
        gulp.src(conf.get('src'))
            .pipe(license(conf.get('license'), {
                organization: conf.get('author'),
            }))
            .pipe(gulp.dest(conf.get('dest')));
    });

    gulp.task('release', ['release:license']);
};
