# How to release

- change the version on `manifest.json`
- create a git tag (ex: `git tag v0.0.9`) and push it `git push --tags`
- go to Releases page of the repo
- click "Draft a new release"
- choose the tag
- write the changelog

## Releasing on Chrome Web Store
Once the release in created on Github

- zip the folder `youcaptain`
- go to https://chrome.google.com/u/1/webstore/devconsole
- upload the zip folder
- change the description if necessary
- submit it for review
