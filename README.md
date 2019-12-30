# <img src="icon48.png" width="30"> YouCaptain <img src="https://img.shields.io/github/v/release/glaucocustodio/youcaptain">

A simple browser extension that enables keyboard navigation on YouTube.

![demo.gif](https://raw.githubusercontent.com/glaucocustodio/youcaptain/master/demo.gif)

## Why?

I used to be a heavy user of the [discontinued youtube.com/leanback](https://github.com/codyogden/killedbygoogle/issues/590). Now it's gone, I needed to find a way to navigate on YouTube by just using my <a href="https://www.amazon.com/WOSUNG-Wireless-Keyboard-Android-Raspberry/dp/B01C2O4PG6?ref_=fsclp_pl_dp_9">mini keyboard</a>.

## Shortcuts

I've set up some shortcuts to ease my life, the bad news is that they aren't configurable. Feel free to send a patch if you miss this feature :)

- `backspace`: go to previous page (history back)
- `enter`: left click
- `h`: like/dislike video
- `s`: focus on search field
- `u`: focus on video player if a video is being played, otherwise, focus on first video of the list
- `y`: go to home page (/)
- `f1`: zoom out
- `f2`: zoom in

## Compatibility

This extension must work in any browser compatible with the [extension API](https://developer.chrome.com/extensions) or [WebExtensions API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions). I've tested it on the following browsers:

- Google Chrome
- Firefox Developer Edition
- Brave Browser

## Installation

### Firefox

https://addons.mozilla.org/addon/youcaptain/

### Other browsers

This extension is not available on Chrome Web Store as I would have to pay a $5 fee to create a developer account. You can install it by yourself anyway by following the steps below:

- Grab a copy of the source code either by cloning this repository or by downloading and extracting the zipped source. You can download zip archive by opening the project page on GitHub and clicking on the "Download" button.
- Next, open the "Extensions" page (`chrome://extensions/`) in the browser and turn on the "Developer mode".
- Click on the "Load unpacked" button and select the source code you just downloaded.

Note: extensions installed as unpacked aren't updated automatically. To update the extension you should download it and install as unpacked again.

Check the [releases page](https://github.com/glaucocustodio/youcaptain/releases) for new versions.

## Acknowledgment

This extension wouldn't be possible without [js-spatial-navigation](https://github.com/luke-chang/js-spatial-navigation).
