/*
  document.addEventListener('transitionend', function(e) {
    // YT's transition of page
    if(e.target.id == 'progress') {
      runSpatial()
    }
  });

  document.querySelector('ytd-app').addEventListener('yt-page-data-updated', function(e){
  })

  window.addEventListener('pageshow', function() {
  });
*/

document.addEventListener('fullscreenchange', function(e){
  // exit fullscreen
  if (!document.fullscreenElement) {
    runSpatial();
  }
});

var runSpatial = function(){
  SpatialNavigation.makeFocusable();
  setFocus();
}

// mark new videos (loaded via ajax) as focusable
setInterval(function(){
  SpatialNavigation.makeFocusable();
}, 1000);

// when page back is triggered
window.addEventListener('popstate', function(event) {
  runSpatial()
});

document.querySelector('ytd-app').addEventListener('yt-navigate-finish', function(e){
  runSpatial()
});

var setFocus = function(){
  var check = function(){
    var video = document.querySelector('video');
    var videoActive = video && video.src != "";
    if(videoActive){
      SpatialNavigation.focus('ytd-player');
    } else {
      SpatialNavigation.focus('yc-initial');
    }
  }
  check();
}

window.addEventListener('load', function() {
  window.addEventListener("keydown", function(event){
    var letter_u = 85;
    var letter_s = 83;
    var letter_y = 89;
    var letter_h = 72;
    var backspace = 8;
    var isCommentInputBox = document.activeElement.id == "contenteditable-root";

    // do nothing if:
    if (document.activeElement.tagName == 'INPUT' || isCommentInputBox) {
      return;
    }

    if (event.keyCode == letter_u){
      setFocus();
    } else if (event.keyCode == letter_s){
      document.querySelector('#search-input input').focus()
      event.preventDefault();
    } else if (event.keyCode == letter_y){
      window.location = '/';
    } else if (event.keyCode == letter_h){
      var likeButton = document.querySelector('ytd-video-primary-info-renderer ytd-toggle-button-renderer:first-child');
      likeButton && likeButton.click();
    } else if (event.keyCode == backspace){
      window.history.back();
    }
  });

  window.addEventListener('sn:enter-down', function(event){
    var link = event.target.querySelector('a.yt-simple-endpoint')
    if(link) {
      var clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      link.dispatchEvent(clickEvent);
    }
    SpatialNavigation.makeFocusable();
  });

  SpatialNavigation.init();
  /*
    video: ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer ou apenas ytd-thumbnail
    small screen side menu links (home, trending, subs, library): ytd-mini-guide-entry-renderer
    channel box on search results page: ytd-channel-renderer
    show more / less button: paper-button.ytd-expander
  */
  SpatialNavigation.add({
    id: 'yc-initial',
    selector: 'ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-player, ytd-guide-entry-renderer, .ytd-video-primary-info-renderer ytd-toggle-button-renderer, ytd-video-owner-renderer, .paper-tab, #subscribe-button paper-button, yt-confirm-dialog-renderer yt-button-renderer, yt-confirm-dialog-renderer, ytd-mini-guide-entry-renderer, ytd-channel-renderer, paper-button.ytd-expander',
  })
  // adds another section to avoid focus on the YT logo when accessing the home page
  SpatialNavigation.add({
    id: 'yc-links',
    selector: 'ytd-topbar-logo-renderer, #search-input input',
  })
  runSpatial();
});
