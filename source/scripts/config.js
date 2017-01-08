// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    controls: true,
    progress: true,
    center: true,
    history: true,

    transition: "slide", // none/fade/slide/convex/concave/zoom

    // Optional reveal.js plugins
    dependencies: [
        { src: "js/reveal/marked.js", condition() { return !!document.querySelector( "[data-markdown]" ); } },
        { src: "js/reveal/markdown.js", condition() { return !!document.querySelector( "[data-markdown]" ); } },
        { src: "js/reveal/highlight.js", async: true, callback() { hljs.initHighlightingOnLoad(); } },
        { src: "js/reveal/zoom.js", async: true },
        { src: "js/reveal/notes.js", async: true }
    ]
});
