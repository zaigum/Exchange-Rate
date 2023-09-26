

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




document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById("fetchExchangeRateButton");
  const targetCurrencyInput = document.getElementById("targetCurrencyInput");
  const countryNameDisplay = document.getElementById("countryNameDisplay"); // Add an element to display the country name

  fetchButton.addEventListener("click", async function () {
    const targetCurrency = targetCurrencyInput.value;
    chrome.runtime.sendMessage({ getExchangeRate: true, targetCurrency });

    // Fetch a comprehensive list of country names and currency codes from an API
    try {
      const response = await fetch('https://restcountries.com/v2/all');
      if (response.ok) {
        const data = await response.json();
        const currencyCountryMap = createCurrencyCountryMap(data);
        
        const countryName = currencyCountryMap[targetCurrency];
        
        if (countryName) {
          countryNameDisplay.textContent = `Country: ${countryName}`;
        } else {
          countryNameDisplay.textContent = "Country: Not Found";
        }
      } else {
        console.error('Failed to fetch country data');
      }
    } catch (error) {
      console.error('Error fetching country data', error);
    }
  });

  // Function to create a mapping of currency codes to country names from fetched data
  function createCurrencyCountryMap(countryData) {
    const currencyCountryMap = {};
    countryData.forEach(country => {
      if (country.currencies && country.currencies[0] && country.currencies[0].code) {
        currencyCountryMap[country.currencies[0].code] = country.name;
      }
    });
    return currencyCountryMap;
  }
});
