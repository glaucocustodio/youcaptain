// receive message from content_script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const zoomDelta = 0.10;
  if (request.command == 'zoom_in') {
    // only background scripts can get and set the browser zoom
    chrome.tabs.getZoom(function(zoomFactor){
      chrome.tabs.setZoom(zoomFactor + zoomDelta);
    })
  } else if (request.command == 'zoom_out') {
    chrome.tabs.getZoom(function(zoomFactor){
      chrome.tabs.setZoom(zoomFactor - zoomDelta);
    })
  }
});
