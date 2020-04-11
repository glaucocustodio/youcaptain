window.addEventListener("load", function(){
  console.log('page load');
  // const markLikedVideo = document.querySelector('#liked_video');
  const enterFullscreen = document.querySelector('#enterFullscreen');
  const playAudioOnFocus = document.querySelector('#playAudioOnFocus');
  const feedback = document.querySelector('.feedback');

  const form = document.querySelector('#optionsForm');
  const defaultPreferences = { enterFullscreen: true, playAudioOnFocus: true }
  // read saved state on page load
  chrome.storage.local.get(defaultPreferences, function(result) {
    enterFullscreen.checked = result.enterFullscreen;
    playAudioOnFocus.checked = result.playAudioOnFocus;
  });

  form.addEventListener('submit', function(event){
    event.preventDefault();
    const userPreferences = {
      enterFullscreen: enterFullscreen.checked,
      playAudioOnFocus: playAudioOnFocus.checked
    };
    chrome.storage.local.set(userPreferences);
    feedback.innerHTML = 'saved successfully!'
    feedback.classList.add('visible')

    setTimeout(function(){
      feedback.classList.remove('visible')
    }, 3000);
  });
});
