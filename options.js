window.addEventListener("load", function(){
  const markLikedVideo = document.querySelector('#liked_video');
  const form = document.querySelector('#optionsForm');

  // read saved state on page load
  chrome.storage.local.get(['mark_liked_video'], function(result) {
    markLikedVideo.checked = result.mark_liked_video
  });

  form.addEventListener('submit', function(event){
    event.preventDefault();
    chrome.storage.local.set({ mark_liked_video: markLikedVideo.checked });
  });
});
