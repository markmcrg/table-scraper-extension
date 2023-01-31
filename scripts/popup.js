
//  Send messages to contentScript.js
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

// Listen for messages from contentScript.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "number") {
    document.getElementById("number-display").innerHTML = request.value + " rows scraped";
    console.log(request.value); 
  }
  else if (request.type === 'rowCount') {
    document.getElementById("total-rows").innerHTML = "Total: " + request.value + " rows scraped";
    console.log(request.value);
  }
  else if (request.type === "download-complete") {
    document.getElementById("download-display").innerHTML = "Download Complete!";}
  else if (request.type === "reset-complete") {
    document.getElementById("reset-display").innerHTML = "Reset Complete!";}
});