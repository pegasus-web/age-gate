(function (w, d) {

    // Check if the script has already loaded.
    if (w.hasAgeGate) {
        return;
    }

    w.hasAgeGate = true;

    // domready.js - http://stackoverflow.com/a/25560381/12787
    function domReady(fn, ctx) {

        function onReady(event) {
            d.removeEventListener("DOMContentLoaded", onReady);
            fn.call(ctx || w, event);
        }

        function onReadyIe(event) {
            if (d.readyState === "complete") {
                d.detachEvent("onreadystatechange", onReadyIe);
                fn.call(ctx || w, event);
            }
        }

        d.addEventListener && d.addEventListener("DOMContentLoaded", onReady) ||
		d.attachEvent && d.attachEvent("onreadystatechange", onReadyIe);
    }

    // Load CSS, VanillaJS style - http://stackoverflow.com/a/577002/12787
    function injectCSS(href) {
        var link = d.createElement("link");
        link.href = href;
        link.type = "text/css";
        link.rel = "stylesheet";

        d.getElementsByTagName("head")[0].appendChild(link);
    }

    function injectHTML(markup) {
        var container = d.createElement("div");
        container.innerHTML = markup;

        var body = d.getElementsByTagName("body")[0];
        body.insertBefore(container.children[0], body.firstChild);
    }

    domReady(function () {

        injectCSS("age-gate.css");

        injectHTML('\
<div id="#pwag" class="pwag overlay">\
	<div class="overlay-content">\
		<h1>Pegasus Web Age Gate</h1>\
		<h2>Are you over 18?</h2>\
	</div>\
</div>');

    });

})(window, document);