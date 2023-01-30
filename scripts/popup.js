document.querySelector('#scrape-button').addEventListener('click', function() {
    // Send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'scrape' });
    });
  });

document.querySelector("#download-button").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "download"});
    });
  });

document.querySelector("#reset-button").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "reset"});
    });
  });
  