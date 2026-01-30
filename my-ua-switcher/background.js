const LINUX_UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateRules") {
    if (message.enabled) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [{
          "id": 1,
          "priority": 1,
          "action": {
            "type": "modifyHeaders",
            "requestHeaders": [
              { "header": "user-agent", "operation": "set", "value": LINUX_UA },
              { "header": "sec-ch-ua-platform", "operation": "set", "value": "\"Linux\"" }
            ]
          },
          "condition": { "urlFilter": "*", "resourceTypes": ["main_frame", "sub_frame", "xmlhttprequest", "script"] }
        }]
      });
    } else {
      chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [1] });
    }
  }
});