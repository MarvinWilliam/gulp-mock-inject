#gulp-mock-inject

Auto inject mock test script into html.

##Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<!-- mockinject -->
<!-- endinject -->
</body>
</html>
```

```javascript
var gulp   = require('gulp'),
    inject = require('../src/index');
    
gulp.task('Inject',function(){
    return  gulp.src('./test/*.html')
                .pipe(inject.server({
                    script:'123.js'
                }))
                .pipe(gulp.dest('test'));
});

gulp.task('clearInject',function(){
    return  gulp.src('./test/*.html')
                .pipe(inject.dist())
                .pipe(gulp.dest('test'));
});
```

##API

**`server(options)`**
Inject script into html file with designated script.
Html file should have inject sign like:
```html
<!-- mockinject -->
<!-- endinject -->
```

**options.script**

Type:`String`

Path of script.

**`dist()`**

Clear injected script for build.