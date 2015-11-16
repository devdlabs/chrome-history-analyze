'use strict';
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;

    getVisitedTimes(url, function(times){
      renderVisitedTimes('Visited Times: ' + times)
    });

    callback(url);
  });
}

function getVisitedTimes(url, callback) {
  var domain = new URI(url).domain();
  chrome.history.search({text:domain, startTime:1 ,maxResults:1000000}, function(results){
    var filteredResults = results.filter(result => new URI(result.url).domain() == domain)
    if(filteredResults.length > 1){
      renderLastVisited(filteredResults[1].lastVisitTime);
    }
    callback(filteredResults.length);
  });
}

function renderLastVisited(epochTime) {
  var timeAgo = moment(epochTime).fromNow();  
  document.getElementById('lastVisited').textContent = "Last Visited: " + timeAgo;
}

function renderUrl(currentUrl) {
  document.getElementById('url').textContent = currentUrl;
}

function renderVisitedTimes(visitedTimesText) {
  document.getElementById('visitedTimes').textContent = visitedTimesText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    if(url.length > 35)
      url = url.substr(0, 34) + "..."
    renderUrl('Current Url: ' + url);
  });
});
