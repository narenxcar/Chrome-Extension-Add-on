function processBodyContent(){
    const text = document.body.innerText;
    var temp = "";
    var arr = [];
    for (var i = 0; i < text.length; i++) {
        if (text[i] == '[' || text[i] == ']') continue;
        if ((text[i] >= '0' && text[i] <= '9') || text[i] == '.') {
            temp += text[i];
        } else {
            if (temp.length >= 7) {
                arr.push(temp);
                temp = "";
            }
        }
    }
    return processParsedIPs(arr);
}

function validIP(ip) {
    var count = 0;
    var temps = "";
    for (var i = 0; i < ip.length; i++) {
        if (ip[i] == '.') {
            count++;
            if (temps == "") {
                return false;
            } else {
                if (parseInt(temps) > 255) {
                    return false;
                } else {
                    temps = "";
                }
            }
        } else {
            temps += ip[i];
        }
    }
    if (temps == "" || count != 3) return false;
    if (parseInt(temps) > 255) return false;
    return true;
}
function processParsedIPs(arr){
    var result = "";
    var resultText = [];
    for (var i = 0; i < arr.length; i++) {
        if (validIP(arr[i])) {
            result = result + arr[i];
            result = result + "<br>";
            resultText.push(arr[i]);
        }
    }
    return result;
}

// Method 1
// To listen to messages from popup script
// and respond with the IP list
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("received msg");
      if (request.action === "fetchIPs") {
        let list = processBodyContent();
        sendResponse({status: "done", ips: list });
      }
    }
);

// Method 2
// To send IP values from content script itself
/*
setTimeout(()=> {
    let list = processBodyContent();
    chrome.runtime.sendMessage({
        action: "fetchIPs",
        ips: list
    });
}, 5000);
*/