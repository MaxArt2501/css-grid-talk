(() => {
    const tw = document.createTreeWalker(document.querySelector(".slides"), NodeFilter.SHOW_COMMENT, null, null);
    let comment;
    while (comment = tw.nextNode()) {
        const slide = comment.parentNode.closest("section");
        if (!slide) continue;
        let aside = slide.querySelector("aside.notes");
        if (!aside) {
            aside = document.createElement("aside");
            aside.className = "notes";
            aside.innerHTML = "<ul></ul>";
            slide.appendChild(aside);
        }
        aside.firstChild.insertAdjacentHTML("beforeEnd", `<li>${comment.nodeValue}</li>`);
    }
})();

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
