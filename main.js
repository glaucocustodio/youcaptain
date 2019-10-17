var runSpatial = function(){
  SpatialNavigation.makeFocusable();
  SpatialNavigation.focus('initial');

  document.querySelector('ytd-browse, ytd-watch-next-secondary-results-renderer').addEventListener("DOMNodeInserted", function(event) {
    SpatialNavigation.makeFocusable();
  });
}

document.addEventListener('transitionend', function(e) {
  // YT's transition of page
  if(e.target.id == 'progress') {
    runSpatial()
  }
});

// window.addEventListener('pageshow', function() {
// });

window.addEventListener('load', function() {
  window.addEventListener("keydown", function(event){
    // console.log(event.keyCode);
    var letter_u = 85;
    var letter_s = 83;
    var letter_y = 89;
    var backspace = 8;

    // do nothing if element in focus is INPUT
    if (document.activeElement.tagName == 'INPUT') {
      return;
    }

    if (event.keyCode == letter_u){
      console.log('focus');
      SpatialNavigation.focus('initial');
    } else if (event.keyCode == letter_s){
      console.log('search');
      document.querySelector('#search-input input').focus()
      event.preventDefault();
    } else if (event.keyCode == letter_y){
      window.location = '/';
    } else if (event.keyCode == backspace){
      window.history.back();
    }
  });

  window.addEventListener('sn:enter-down', function(event){
    var link = event.target.querySelector('a.yt-simple-endpoint')
    var clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    link.dispatchEvent(clickEvent);
    SpatialNavigation.makeFocusable();
  });

  SpatialNavigation.init();
  SpatialNavigation.add({
    id: 'initial',
    selector: 'ytd-thumbnail, ytd-player, ytd-guide-entry-renderer',
  })
  SpatialNavigation.add({
    id: 'home',
    selector: 'ytd-topbar-logo-renderer, #search-input input',
  })
  runSpatial()
});
