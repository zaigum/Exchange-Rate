// Exchange rate data ko DOM mein display karein
function displayExchangeRate(rate) {
    // DOM manipulation code yahan likhein
}

// Background script se exchange rate data ko receive karein
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.exchangeRate) {
        displayExchangeRate(message.exchangeRate);
    }
});
