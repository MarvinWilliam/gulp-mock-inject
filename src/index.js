var through2 = require('through2');

var tasks = (function () {
    var injectTagReg  = /(<!--\s*mockinject\s*-->)([\s\S\w]+)(<!--\s*endinject\s*-->)/g,
        scriptSrc     = '<!-- mockinject -->\n<script src="{{_src}}"></script>\n<!-- endinject -->',
        nullscriptSrc = '<!-- mockinject -->\n<!-- endinject -->';

    function log(text) {
        return util.log(util.colors.green(text));
    }

    function logWarning(text) {
        return util.log(util.colors.yellow(text));
    }

    function logDebug(text) {
        return util.log(util.colors.blue(text));
    }

    function serverTask(options) {
        if (!options.script) {
            logWarning('gulp-mock-inject mock script can not be null!');
            return;
        } else {
            scriptSrc = scriptSrc.replace(/{{_src}}/g, options.script);
        }

        return through2.obj(function (file, env, cb) {
            if (file.isNull() || file.isDirectory()) {
                logDebug('null or directory');
                this.push(file);
                cb();
            }
            if (file.isBuffer()) {
                var result = String(file.contents).replace(injectTagReg, scriptSrc);
                file.contents = new Buffer(result);
                this.push(file);
                cb();
            }
        });
    }

    function distTask() {
        return through2.obj(function (file, env, cb) {
            if (file.isNull() || file.isDirectory()) {
                this.push(file);
                return cb();
            }
            if (file.isBuffer()) {
                var result = String(file.contents).replace(injectTagReg, nullscriptSrc);
                file.contents = new Buffer(result);
                this.push(file);
                return cb();
            }
        });
    }

    return {
        server: serverTask,
        dist: distTask
    };
})();

module.exports = tasks;