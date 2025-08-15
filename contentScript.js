function displayExchangeRate(rate) {}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.exchangeRate) {
    document.getElementById("exchangeRate").textContent = message.exchangeRate;
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const currencyInput = document.getElementById("currencyInput");
  currencyInput.addEventListener("input", function () {
    const enteredCurrency = currencyInput.value;
    displayExchangeRate(exchangeRate, enteredCurrency);
  });
});