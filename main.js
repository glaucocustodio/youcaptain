var runSpatial = function(){
  SpatialNavigation.makeFocusable();
  setFocus();
}

// mark new videos (loaded via ajax) as focusable
setInterval(function(){
  // console.log('interval');
  SpatialNavigation.makeFocusable();
}, 1000);

// page back
window.addEventListener('popstate', function(event) {
  runSpatial()
});

// document.addEventListener('transitionend', function(e) {
//   // YT's transition of page
//   if(e.target.id == 'progress') {
//     runSpatial()
//   }
// });


var app = document.querySelector('ytd-app');
app.addEventListener('yt-navigate-finish', function(e){
  runSpatial()
});
// app.addEventListener('yt-page-data-updated', function(e){
//   console.log('page-updated');
// })

// window.addEventListener('pageshow', function() {
// });

var setFocus = function(){
  var check = function(){
    var video = document.querySelector('video');
    var videoActive = video && video.src != "";
    if(videoActive){
      console.log('video');
      SpatialNavigation.focus('ytd-player');
    } else {
      console.log('n video');
      SpatialNavigation.focus('yc-initial');
    }
  }
  check();
  // setTimeout(function(){
  //   check()
  // }, 2000);
}
window.addEventListener('load', function() {
  window.addEventListener("keydown", function(event){
    var letter_u = 85;
    var letter_s = 83;
    var letter_y = 89;
    var letter_h = 72;
    var backspace = 8;

    // do nothing if element in focus is INPUT
    if (document.activeElement.tagName == 'INPUT') {
      console.log('nothing');
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
    console.log('enter:');
    // console.log(event.target);
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

  // var unsubscribeButton = document.querySelector('ytd-subscribe-button-renderer paper-button[subscribed]')
  // if(unsubscribeButton){
  //   unsubscribeButton.addEventListener('click', function(){
  //     console.log('got clicked');
  //     SpatialNavigation.makeFocusable();

  //     setTimeout(function(){
  //       var unsubscribeButtons = document.querySelectorAll('yt-confirm-dialog-renderer yt-button-renderer')
  //       var unsubscribeConfirmButton = unsubscribeButtons[1]

  //       console.log(unsubscribeButtons);
  //       console.log(unsubscribeConfirmButton);
  //       if (unsubscribeButtons && unsubscribeConfirmButton) {
  //         unsubscribeConfirmButton.click()
  //       }
  //     }, 1000)
  //   })
  // }

  SpatialNavigation.init();
  // video: ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer ou apenas ytd-thumbnail
  // small screen side menu links (home, trending, subs, library): ytd-mini-guide-entry-renderer
  // channel box on search results page: ytd-channel-renderer
  // show more / less button: paper-button.ytd-expander
  SpatialNavigation.add({
    id: 'yc-initial',
    selector: 'ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-player, ytd-guide-entry-renderer, .ytd-video-primary-info-renderer ytd-toggle-button-renderer, ytd-video-owner-renderer, .paper-tab, #subscribe-button paper-button, yt-confirm-dialog-renderer yt-button-renderer, yt-confirm-dialog-renderer, ytd-mini-guide-entry-renderer, ytd-channel-renderer, paper-button.ytd-expander',
  })
  SpatialNavigation.add({
    id: 'yc-links',
    selector: 'ytd-topbar-logo-renderer, #search-input input',
  })
  runSpatial()
});
