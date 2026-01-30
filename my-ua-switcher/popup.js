const checkbox = document.getElementById('mode-switch');

// 初始化狀態
chrome.storage.local.get('linuxMode', (data) => {
  checkbox.checked = data.linuxMode || false;
});

checkbox.addEventListener('change', () => {
  const isEnabled = checkbox.checked;
  chrome.storage.local.set({ linuxMode: isEnabled });
  chrome.runtime.sendMessage({ action: "updateRules", enabled: isEnabled });
});