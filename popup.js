

// Listen for the exchange rate message from the background script
// popup.js
chrome.runtime.sendMessage({ getExchangeRate: true });

// contentScript.js (or background.js)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.exchangeRate) {
    document.getElementById("exchangeRate").textContent = message.exchangeRate;
  }
});

// Retrieve exchange rate from local storage
chrome.storage.local.get(['exchangeRate'], function (result) {
    if (result.exchangeRate) {
        const exchangeRate = result.exchangeRate;
        displayExchangeRate(exchangeRate);
    }
});

// Display exchange rate in the DOM
function displayExchangeRate(rate) {
    // DOM manipulation code here
    document.getElementById("exchangeRate").textContent = rate;
}
// Send a message to the background script to get the exchange rate
chrome.runtime.sendMessage({ getExchangeRate: true });






// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById("fetchExchangeRateButton");
  const targetCurrencyInput = document.getElementById("targetCurrencyInput");

  fetchButton.addEventListener("click", function () {
    const targetCurrency = targetCurrencyInput.value;
    chrome.runtime.sendMessage({ getExchangeRate: true, targetCurrency });
  });
});
