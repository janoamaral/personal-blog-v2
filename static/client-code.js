!function() {

  function receiveHeight(event) {
    if (event.data['origin'] == "stackshare") {
      var iframe = document.querySelectorAll("iframe[data-embed-code='1d462e5f58fb0d0f21f72d7723f472']")[0];
      iframe.height = event.data['embedHeight'];

      const cssLink = document.createElement("link");
      cssLink.href = "style.css";
      cssLink.rel = "stylesheet";
      cssLink.type = "text/css";
      iframe.contentWindow.document.body.style = "background:rgba(0,0,0,0)"
    }
  }

  if (window.addEventListener) {
    window.addEventListener("message", receiveHeight, false);
  } else {
    window.attachEvent("onmessage", receiveHeight);
  }
}();
