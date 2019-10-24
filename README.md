# <img src="icon48.png" width="30"> YouCaptain

A simple Chrome extension that enables keyboard navigation on YouTube.

![demo.gif](https://raw.githubusercontent.com/glaucocustodio/youcaptain/master/demo.gif)

## Why?

I used to be a heavy user of the [discontinued youtube.com/leanback](https://github.com/codyogden/killedbygoogle/issues/590). Now it's gone, I needed to find a way to navigate on YouTube by just using my mini keyboard.

## Shortcuts

I've set up some shortcuts to ease my life, the bad news is that they aren't configurable. Feel free to send a patch if you miss this feature :)

- `backspace`: go to previous page (history back)
- `enter`: left click
- `h`: like/dislike video
- `s`: focus on search field
- `u`: focus on video player if a video is being played, otherwise, focus on first video of the list
- `y`: go to home page (/)

## Installation

This extension is not available on Chrome Web Store as I would have to pay a $5 fee to create a developer account. But you can install it by yourself on Google Chrome or any Chromium-based browsers (e.g. Brave, Opera, Vivaldi etc) by following the steps below:

- Grab a copy of the source code either by cloning this repository or by downloading and extracting the zipped source. You can download zip archive by opening the project page on GitHub and clicking on the "Download" button.
- Next, open the "Extensions" page (chrome://extensions/) in the browser and turn on the "Developer mode".
- Click on the "Load unpacked" button and select the source code you just downloaded.

Note: extensions installed as unpacked aren't updated automatically. To update the extension you should download it and install as unpacked again.

## Acknowledgment

This extension wouldn't be possible without [js-spatial-navigation](https://github.com/luke-chang/js-spatial-navigation).
