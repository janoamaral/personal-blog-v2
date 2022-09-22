!function() {
  var embeds = document.querySelectorAll("[data-stack-embed='true']");

  function receiveHeight(event) {
    if (event.data['origin'] == "stackshare") {
      var embedCode = event.data['embedCode'];

      var embeds = document.querySelectorAll("[data-stack-embed='true']");
      for (var i = 0, embed; embed = embeds[i]; i++) {
        var url = embed.href;
        var strings = url.split('/');
        if (strings[5] == embedCode) {
          var iframe = document.querySelectorAll("iframe[data-embed-code='" + embedCode + "']")[0];
          iframe.height = event.data['embedHeight'];

          const cssLink = document.createElement("link");
          cssLink.href = "style.css";
          cssLink.rel = "stylesheet";
          cssLink.type = "text/css";
          iframe.contentWindow.document.body.style = "background:rgba(0,0,0,0)"
        }
      }
    }
  }

  if (window.addEventListener) {
    window.addEventListener("message", receiveHeight, false);
  } else {
    window.attachEvent("onmessage", receiveHeight);
  }
}();
