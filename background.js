chrome.runtime.onInstalled.addListener(function() {
  const defaultPreferences = { enterFullscreen: true, playAudioOnFocus: true };
  chrome.storage.local.set(defaultPreferences);
});

// receive message from content_script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const zoomDelta = 0.10;
  const tabId = sender.tab.id;
  if (request.command == 'zoom_in') {
    chrome.tabs.getZoom(tabId, function(zoomFactor){
      chrome.tabs.setZoom(tabId, zoomFactor + zoomDelta);
    });
  } else if (request.command == 'zoom_out') {
    chrome.tabs.getZoom(tabId, function(zoomFactor){
      chrome.tabs.setZoom(tabId, zoomFactor - zoomDelta);
    });
  }
});
