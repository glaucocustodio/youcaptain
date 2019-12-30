/*
   receive message from web resource
   this listener could be removed if we could send messages directly from web resource to background scripts
   but Firefox does not support externally_connectable in manifest (just Chromium)
*/
window.addEventListener("message", function(event) {
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    // send message to background script
    chrome.runtime.sendMessage({
      command: event.data.command
    });
  }
}, false)


var s = document.createElement('script');
s.src = chrome.extension.getURL('spatial_navigation.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode ? s.parentNode.removeChild(s) : null;
};

var s = document.createElement('script');
s.src = chrome.extension.getURL('main.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode ? s.parentNode.removeChild(s) : null;
};
