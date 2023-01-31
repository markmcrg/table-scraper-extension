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
outputBox = document.getElementById("display-box");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "numberAndRowCount") {
    var rowsLength = request.numberValue;
    var rowCounter = request.rowCountValue;
    outputBox.classList.remove("alert-danger", "alert-info");
    outputBox.classList.add("alert-success");
    outputBox.style.display = "inline";
    outputBox.innerText = "Scraped " + rowsLength + " rows. \nTotal: " + rowCounter + " rows scraped";
  }
  else if (request.type === "download-complete") {
    outputBox.classList.remove("alert-danger", "alert-success");
    outputBox.classList.add("alert-info")
    outputBox.style.display = "inline";
    outputBox.innerText = "Exported CSV file!";
  }
  else if (request.type === "reset-complete") {
    outputBox.classList.remove("alert-danger", "alert-success");
    outputBox.classList.add("alert-danger")
    outputBox.style.display = "inline";
    outputBox.innerText = "Deleted all rows!";
  }
});