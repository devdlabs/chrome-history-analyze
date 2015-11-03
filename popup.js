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

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}
function getVisitedTimes(url, callback) {
  var domain = url.split('/')[2].split(':')[0]
  chrome.history.search({text:domain, startTime:1000000 ,maxResults:1000000}, function(results){
    callback(results.length);
  });
}


function renderUrl(statusText) {
  document.getElementById('url').textContent = statusText;
}

function renderVisitedTimes(visitedTimesText) {
  document.getElementById('visitedTimes').textContent = visitedTimesText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
      renderUrl('Current Url: ' + url);
  });
});