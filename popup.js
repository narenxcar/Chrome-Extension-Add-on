// Method 1
// To fetch IP values from content script after user clicks a button
// Communication initiated from Popup script to content script
const sendMessageButton = document.getElementById('sendMessage')
sendMessageButton.onclick = async function(e) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);

    chrome.tabs.sendMessage(tab[0].id, {action: "fetchIPs"}, function(response) {
        // alert(response.ips);
        document.getElementById("IP").innerHTML = response.ips;
    });
}

// Method 2
// To receive IP values directly from content script itself
/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "fetchIPs") {
        document.getElementById("IP").innerText = request.ips;
      }
    }
);
*/
