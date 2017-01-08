Reveal.addEventListener("fragmentshown", (event) => {
    if (event.fragment.id !== "tableLayout") return;

    const twrt = typewriterStandalone(event.fragment.firstElementChild)
        .withAccuracy(98)
        .withMinimumSpeed(10)
        .withMaximumSpeed(20)
        .build();

    twrt.clear()
        .type("<table id=\"mainLayout\">")
        .put("<br>  ")
        .wait(1000)
        .type("<tr id=\"header\">")
        .put("<br>    ")
        .wait(200)
        .type("<td colspan=3>")
        .put("<br>      ")
        .wait(500)
        .type("<img src=\"images/logo.jpg\"> Benvenuti!")
        .put("<br>    ")
        .wait(200)
        .type("</td>")
        .put("<br>  ")
        .wait(200)
        .type("</tr>")
        .put("<br>  ")
        .type("<tr id=\"main\">")
        .put("<br>  ")
        .wait(500)
        .type("...")
    ;
});
