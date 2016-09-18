var pwagInit = (function(exports, d){

	function domReady(fn, ctx) {

		function onReady(event) {
			d.removeEventListener("DOMContentLoaded", onReady);
			fn.call(ctx || exports, event);
		}

		function onReadyIe(event) {
			if (d.readyState === "complete") {
				d.detachEvent("onreadystatechange", onReadyIe);
				fn.call(ctx || exports, event);
			}
		}

		d.addEventListener && d.addEventListener("DOMContentLoaded", onReady) ||
		d.attachEvent && d.attachEvent("onreadystatechange", onReadyIe);
    }

	domReady(function(){
		pwagCore.initGate();
	});

	window.addEventListener('resize', pwagCore.windowResize);

})(window, document);