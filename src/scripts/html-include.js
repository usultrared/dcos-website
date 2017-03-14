$(document).ready(() => {
  // HTML Includes
  (function() {
    var parent = document.getElementById("html-include");
    if (!parent) {
      return;
    }
    var file = parent.getAttribute("data-api");
    if (!file) {
      return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var html = this.responseText;
        // Format response text, if set
        var format = parent.getAttribute("data-format");
        if (format && window[format]) {
          html = window[format](html);
        }
        // Rewrite div content
        parent.innerHTML = html;
        // Execute init function, if set
        var init = parent.getAttribute("data-init");
        if (init && window[init]) {
          window[init]();
        }
        // Remove trigger field
        parent.removeAttribute("data-api");
      }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
  }());
});

window
