## Screenshot (html2canvas)*
* Takes a screenshot of the DOM
* Client side rendering
* Layout and variable info (campaign name) will be easy to accomodate since it uses the DOM to capture the image
* Only downside is space (if browser window cuts anything off it wont save right)-- shouldn't be an issue for our use case
* Mobile saves a little weird.
* MIT license, ~840k downloads per week, last updated ~3 months ago

## Component to Image (react-component-export)
* Doesn't expose blobs so would still have to pass it to something like html2canvas
* Does generate PDFs really well so pinning for possible later uses
* MIT license, ~14k weekly downloads, last updated over 1 year ago

## Raw JS (no libraries)
* No additional libraries needed
* Is unreliable on load (sometimes flashes black or doesn't load.)
  * Can probably address this but moving on for now to check out other libraries and solutions.
* Also hard to organize the elements so will be time consuming to create new laytous
