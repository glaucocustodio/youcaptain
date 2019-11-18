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

    // Injected scripts (like main.js) don't have access to the storage api, so I do this
    // to send saved options as a custom event to it
    chrome.storage.local.get(['mark_liked_video'], function(result) {
      var message = result;
      var event = new CustomEvent("ExtensionOptionsRead", { detail: message });
      window.dispatchEvent(event);
    });
    // once a value is changed I send another event
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for(key in changes) {
        if(key === 'mark_liked_video') {
           var message = { mark_liked_video: changes.mark_liked_video.newValue };
           var event = new CustomEvent("ExtensionOptionsRead", { detail: message });
           window.dispatchEvent(event);
        }
     }
   });

};
