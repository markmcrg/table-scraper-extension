// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === 'scrape') {
      exportTableToCSV()
      console.log(csv);
      console.log(csvContent);
      console.log('scraped!');
    }
    else if (request.type === 'download') {
      downloadCSV(csvContent, 'table');
      console.log('downloaded!')
    }
    else if (request.type === 'reset') {
      resetCSV();
      console.log('variables reset!')
    }
  });

// Reset CSV variables
function resetCSV()
{
  csv = [];
  csvContent = [];
}

// Download csv array passed in as a parameter
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

var csvContent;
var csv = [];

// Export table to a CSV array
function exportTableToCSV() {  
var rows = document.querySelectorAll("tbody tr");
var colCounter = 1;

for (var i = 0; i < rows.length; i++) {
  var row = [], cols = rows[i].querySelectorAll("td");

  for (var j = 0; j < cols.length; j++) {
    if (j === 0 && i < 3 && cols[j].innerText == '') {
      cols[j].innerText = colCounter;
      colCounter++;
    }
    row.push(cols[j].innerText);
  }

  csv.push(row.join(","));
}

for (var i = 0; i < csv.length; i++) {
  if (csv[i].length >= 2 && csv[i][1] === "\n") {
    csv[i] = csv[i].substring(2);
}
}

csvContent = csv.join("\n")

}
