var s = document.createElement('script');
s.src = chrome.extension.getURL('spatial_navigation.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode ? s.parentNode.removeChild(s) : null;
};

var s = document.createElement('script');
s.src = chrome.extension.getURL('main.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode ? s.parentNode.removeChild(s) : null;
};
