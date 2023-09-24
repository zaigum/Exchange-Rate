// Exchange rate data ko DOM mein display karein
function displayExchangeRate(rate) {
    // DOM manipulation code yahan likhein
}

// Background script se exchange rate data ko receive karein
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.exchangeRate) {
      document.getElementById("exchangeRate").textContent = message.exchangeRate;
    }
  });
  
// contentScript.js
document.addEventListener("DOMContentLoaded", function () {
    const currencyInput = document.getElementById("currencyInput"); // Replace with your input element ID
    
    currencyInput.addEventListener("input", function () {
        const enteredCurrency = currencyInput.value;
        displayExchangeRate(exchangeRate, enteredCurrency);
    });
});
