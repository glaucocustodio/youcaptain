document.addEventListener('fullscreenchange', function(e){
  // exit fullscreen
  if (!document.fullscreenElement) {
    runSpatial();
  }
});

var runSpatial = function(turnFullscreen = false){
  SpatialNavigation.makeFocusable();
  setFocus(turnFullscreen);
}

var markLikedVideo = function(){
  var likeButton = document.querySelectorAll('#top-level-buttons ytd-toggle-button-renderer')[0];
  var likeButtonActive = likeButton && likeButton.classList.contains('style-default-active');

  if(likeButtonActive){
    document.querySelector('#player-container').style.borderLeft = 'solid 2px red';
  } else {
    player = document.querySelector('#player-container')

    if(player) {
      player.style.borderLeft = '';
    }
  }
}

// mark new videos (loaded via ajax) as focusable
setInterval(function(){
  SpatialNavigation.makeFocusable();

  markLikedVideo();
}, 1000);

// when page back is triggered
window.addEventListener('popstate', function(event) {
  runSpatial()
  // force focus
  setTimeout(function(){
    setFocus();
  }, 200)
});

const setDarkMode = function() {
  const darkMode = document.querySelector('html').getAttribute('dark')
  if (darkMode) {
    document.querySelector('body').classList.add('dark-mode-on')
    document.querySelector('body').classList.remove('dark-mode-off')
  } else {
    document.querySelector('body').classList.add('dark-mode-off')
    document.querySelector('body').classList.remove('dark-mode-on')
  }
}

window.addEventListener("ExtensionOptionsRead", function(event) {
  window.extensionOptions = event.detail
})

const defineMiniplayerSize = function(){
  if(miniPlayer) {
    miniPlayer.style.setProperty('--ytd-miniplayer-width', '175px')
    miniPlayer.style.setProperty('height', '435px')
    miniPlayer.style.setProperty('--ytd-miniplayer-height', '88px')
  }
}

// change the miniplayer size when it gets enabled
const miniPlayer = document.querySelector('ytd-miniplayer');
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type == "attributes" && mutation.attributeName == 'enabled') {
      defineMiniplayerSize()
    }
  });
});
if (miniPlayer) {
  observer.observe(miniPlayer, {
    attributes: true //configure it to listen to attribute changes
  });
}

const cancelArrowHandler = function (event) {
  let arrowRight = 39
  let arrowLeft = 37
  let watchPage = document.querySelector('ytd-app').attributes['is-watch-page']
  // YT's picture-in-picture
  let miniPlayerActive = document.querySelector('ytd-app').attributes['miniplayer-active_'] !== undefined
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  const focusIfFirefox = function() {
    // this is ugly
    if (isFirefox) {
      SpatialNavigation.focus('ytd-player');
    }
  }
  if ((miniPlayerActive || watchPage) && document.fullscreenElement == null) {
    if (event.keyCode == arrowRight) {
      event.stopPropagation();
      SpatialNavigation.move('right');
    } else if (event.keyCode == arrowLeft) {
      event.stopPropagation();
      // focusIfFirefox();
      SpatialNavigation.move('left')
    }
  }
}
const cancelArrowKeys = function() {
  // this event has the purpose of cancelling the propagation of the keydown event
  // when the following conditions are true
  // this is necessary to cancel the default YT ArrowRight and ArrowLeft shortcuts when watching a video
  // https://stackoverflow.com/a/35611393/1519240
  document.addEventListener("keydown", cancelArrowHandler, true);
}

document.querySelector('ytd-app').addEventListener('yt-navigate-finish', function(e){
  document.removeEventListener("keydown", cancelArrowHandler)
  cancelArrowKeys()
  runSpatial(true)
});

var setFocus = function(turnFullscreen = false){
  var check = function(){
    var video = document.querySelector('video');
    var videoActive = video && video.src != "";
    if(videoActive && !miniPlayer){
      SpatialNavigation.focus('ytd-player');
      window.scrollTo(0, 0);
      if(turnFullscreen && window.extensionOptions.enterFullscreen){
        document.documentElement.requestFullscreen();
      }
    } else {
      SpatialNavigation.focus('yc-initial');
    }
  }
  check();
}

window.addEventListener('load', function() {
  setDarkMode()
  cancelArrowKeys()

  window.addEventListener("keydown", function(event){
    var letter_o = 79;
    var letter_u = 85;
    var letter_s = 83;
    var letter_y = 89;
    var letter_h = 72;
    var letter_w = 87;
    var backspace = 8;
    var f1 = 112;
    var f2 = 113;
    var isCommentInputBox = document.activeElement.id == "contenteditable-root";
    // do nothing if:
    if (document.activeElement.tagName == 'INPUT' || isCommentInputBox) {
      return;
    }
    if (event.keyCode == letter_u){
      setFocus();
    } else if (event.keyCode == letter_o){
      // trigger this event to make the icons to appear
      const mouseenterEvent = new Event('mouseenter');
      event.target.dispatchEvent(mouseenterEvent);

      event.target.querySelectorAll('ytd-thumbnail-overlay-toggle-button-renderer').forEach((current) => {
        if(current.innerText == 'ADD TO QUEUE' || current.getAttribute('aria-label') == "Add to queue"){
          current.querySelector('yt-icon').click()
        }
      })
    } else if (event.keyCode == letter_s){
      document.querySelector('#search-input input').focus()
      event.preventDefault();
    } else if (event.keyCode == letter_y){
      window.location = '/';
    } else if (event.keyCode == letter_w){
      window.location = '/playlist?list=WL';
    } else if (event.keyCode == letter_h){
      var likeButton = document.querySelector('ytd-video-primary-info-renderer ytd-toggle-button-renderer:first-child');
      likeButton && likeButton.click();
    } else if (event.keyCode == backspace){
      window.history.back();
    } else if (event.keyCode == f1) {
      // send message to content_script
      window.postMessage({ command: 'zoom_out', type: 'TO_BACKGROUND' })
    } else if (event.keyCode == f2) {
      window.postMessage({ command: 'zoom_in', type: 'TO_BACKGROUND' })
    }
  });

  window.addEventListener('sn:focused', function(event){
    // keep focused element on center (avoid showing just part of a video's thumbnail when walking through a list of videos)
    event.srcElement.scrollIntoView({block: "center"})

    if (window.extensionOptions && window.extensionOptions.playAudioOnFocus) {
      window.postMessage({ command: 'play_button_audio', type: 'TO_CONTENT_SCRIPT' })
    }
  })

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
    playlist item in queue: ytd-playlist-panel-video-renderer
    new video box (home page): ytd-rich-item-renderer
    old video box (home page): ytd-rich-grid-video-renderer
    video box: ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer ou apenas ytd-thumbnail
    small screen side menu links (home, trending, subs, library): ytd-mini-guide-entry-renderer
    channel box on search results page: ytd-channel-renderer
    show more / less button: paper-button.ytd-expander
    comment box: ytd-comment-renderer
    .paper-tab: tab link on subscription page
    #content.ytd-playlist-video-renderer: watch later items
  */
  SpatialNavigation.add({
    id: 'yc-initial',
    selector: 'ytd-rich-item-renderer, ytd-rich-grid-video-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-player, ytd-guide-entry-renderer, .ytd-video-primary-info-renderer ytd-toggle-button-renderer, ytd-video-owner-renderer, .paper-tab, #subscribe-button paper-button, yt-confirm-dialog-renderer yt-button-renderer, yt-confirm-dialog-renderer, ytd-mini-guide-entry-renderer, ytd-channel-renderer, paper-button.ytd-expander, ytd-comment-renderer, #content.ytd-playlist-video-renderer, ytd-playlist-panel-video-renderer'
  })
  // adds another section to avoid focus on the YT logo when accessing the home page
  SpatialNavigation.add({
    id: 'yc-links',
    selector: 'ytd-topbar-logo-renderer, #search-input input',
  })
  runSpatial();
});
