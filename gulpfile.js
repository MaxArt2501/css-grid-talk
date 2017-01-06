const fs = require("fs");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const watch = require("gulp-watch");

gulp.task("css", () => {
    const processors = [
        require("postcss-nested"),
        require("postcss-import"),
        require("postcss-advanced-variables")
    ];

    gulp.src("source/styles/main.css")
        .pipe(postcss(processors))
        .pipe(gulp.dest("public/css"));
});

gulp.task("slides", () => {
    const html = fs.readFileSync("source/slides/index.html", "utf8");
    const parsed = html.replace(/\sdata-slide=(['"])(.+?)\1\s*>/g, (m, quote, source) => {
        const slide = fs.readFileSync(`source/slides/${source}.html`, "utf-8");
        return ">" + slide;
    });
    fs.writeFileSync("public/index.html", parsed);
});

gulp.task("build", () => {
    gulp.src([
        "node_modules/reveal.js/css/reveal.css",
        "node_modules/reveal.js/css/theme/sky.css",
        "node_modules/reveal.js/lib/css/zenburn.css"
    ]).pipe(gulp.dest("public/css"));
    gulp.src([
        "node_modules/reveal.js/lib/js/head.min.js",
        "node_modules/reveal.js/js/reveal.js",
        "node_modules/reveal.js/plugin/markdown/marked.js",
        "node_modules/reveal.js/plugin/markdown/markdown.js",
        "node_modules/reveal.js/plugin/highlight/highlight.js",
        "node_modules/reveal.js/plugin/zoom-js/zoom.js",
        "node_modules/reveal.js/plugin/notes/notes.js"
    ]).pipe(gulp.dest("public/js/reveal"));
    gulp.src([
        "node_modules/typewriter/build/typewriter-bundle-sa.js"
    ]).pipe(gulp.dest("public/js"));
});

gulp.task("images", () => {
    gulp.src("source/images/**/*.{jpg,jpeg,gif,png,webp}")
        .pipe(gulp.dest("public/img"));
});

gulp.task("watch-css", () => {
    watch("source/styles/**/*.css", () => {
        gulp.start("css");
    });
});

gulp.task("watch", () => {
    gulp.start("watch-css");
});
