!function() {
  var embeds = document.querySelectorAll("[data-stack-embed='true']");

  for (var i = 0, embed; embed = embeds[i]; i++) {
    if (embed != undefined) {
      var element = document.createElement("iframe");
      var div = document.createElement("div");
      var theme  = embed.getAttribute("data-theme");
      var layers  = embed.getAttribute("data-layers");
      var hrefSplit = embed.href.split('/');
      var embedCode = hrefSplit[5];

      div.setAttribute('class', 'embed-container');
      div.style =' overflow: hidden; position: relative;';
      element.async = 1;
      element.src = embed.href + '?theme=' + theme + '&layers=' + layers;
      element.width = '100%';
      element.height = 0;
      element.style.border = 0;
      element.setAttribute('data-embed-code', embedCode);
      element.style ='border-width: 0; position: inherit;';
      div.appendChild(element);
      embed.parentNode.insertBefore(div, embed);

      embed.style.display="none";
    }
  }

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
