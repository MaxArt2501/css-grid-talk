const fs = require("fs");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const concat = require("gulp-concat");
const replace = require("gulp-replace");
const watch = require("gulp-watch");

gulp.task("css", () => {
    const processors = [
        require("postcss-import"),
        require("postcss-nested"),
        require("postcss-advanced-variables")
    ];

    gulp.src("source/styles/main.css")
        .pipe(postcss(processors))
        .pipe(gulp.dest("public/css"));
});

gulp.task("slides", () => {
    const html = fs.readFileSync("source/slides/index.html", "utf8");
    const parsed = html.replace(/\sdata-slide=(['"])(.+?)\1[\s\S]*?>/g, (m, quote, source) => {
        try {
            const slide = fs.readFileSync(`source/slides/${source}.html`, "utf-8");
            return m + slide;
        } catch (e) {
            console.error(`Slide non trovata: ${source}`);
            return m;
        }
    });
    if (!fs.existsSync("public")) fs.mkdirSync("public");
    fs.writeFileSync("public/index.html", parsed);
});

gulp.task("js", () => {
    gulp.src("source/scripts/**/*.js")
        .pipe(concat("css-grid-talk.js"))
        .pipe(gulp.dest("public/js"));
});

gulp.task("static", () => {
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
        "node_modules/reveal.js/plugin/notes/notes.js",
    ]).pipe(gulp.dest("public/js/reveal"));
    gulp.src("node_modules/reveal.js/plugin/notes/notes.html")
        .pipe(replace("../../plugin/markdown/marked.js", "./marked.js"))
        .pipe(gulp.dest("public/js/reveal"));
    gulp.src([
        "node_modules/typewriter/build/typewriter-bundle-sa.js"
    ]).pipe(gulp.dest("public/js"));
    gulp.src([
        "source/fonts/*"
    ]).pipe(gulp.dest("public/fonts"));
});

gulp.task("images", () => {
    gulp.src("source/images/**/*.{jpg,jpeg,gif,png,webp,svg,mp4}")
        .pipe(gulp.dest("public/img"));
});

gulp.task("watch-css", () => {
    watch("source/styles/**/*.css", () => {
        gulp.start("css");
    });
});
gulp.task("watch-slides", () => {
    watch("source/slides/**/*.html", () => {
        gulp.start("slides");
    });
});
gulp.task("watch-js", () => {
    watch("source/scripts/**/*.js", () => {
        gulp.start("js");
    });
});
gulp.task("watch-images", () => {
    watch("source/images/**/*.{jpg,jpeg,gif,png,webp,svg,mp4}", () => {
        gulp.start("images");
    });
});

gulp.task("watch", [ "watch-css", "watch-slides", "watch-js", "watch-images" ]);

gulp.task("default", [ "static", "css", "slides", "js", "images" ]);
