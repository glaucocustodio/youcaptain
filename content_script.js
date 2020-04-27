const defaultPreferences = { enterFullscreen: true, playAudioOnFocus: true }

/*
   receive message from web resource
   this listener could be removed if we could send messages directly from web resource to background scripts
   but Firefox does not support externally_connectable in manifest (just Chromium)
*/
window.addEventListener("message", function(event) {
  if (event.source != window)
    return;

  if (event.data.type) {
    if (event.data.type == "TO_BACKGROUND") {
      // send message to background script
      chrome.runtime.sendMessage({
        command: event.data.command
      });
    } else if (event.data.command == 'play_button_audio') {
      var audio = new Audio(chrome.extension.getURL('button.wav'));
      audio.play();
    }
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

    // Injected scripts (like main.js) don't have access to the storage api, so I do this
    // to send saved options as a custom event to it
    chrome.storage.local.get(defaultPreferences, function(result) {
      let detail;
      if (typeof cloneInto === "function") {
        // Firefox requires to use cloneInto otherwise it will deny access to the attributes
        detail = cloneInto(result, document.defaultView)
      } else {
        detail = result
      }

      var event = new CustomEvent("ExtensionOptionsRead", { detail: detail });
      window.dispatchEvent(event);
    });

    // once a value is changed another event is sent
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      if(Object.keys(changes).some(item => Object.keys(defaultPreferences).includes(item))) {
        message = {}
        Object.entries(changes).forEach(([key, value]) => {
          message[key] = value.newValue
        });
        let detail;
        if (typeof cloneInto === "function") {
          // Firefox requires to use cloneInto otherwise it will deny access to the attributes
          detail = cloneInto(message, document.defaultView)
        } else {
          detail = message
        }
        var event = new CustomEvent("ExtensionOptionsRead", { detail: detail });
        window.dispatchEvent(event);
      }
    });
};


