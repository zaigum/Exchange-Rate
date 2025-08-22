
document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById("fetchExchangeRateButton");
  const targetCurrencyInput = document.getElementById("targetCurrencyInput");
  const countryNameDisplay = document.getElementById("countryNameDisplay");
  fetchButton.addEventListener("click", async function () {
    const targetCurrency = targetCurrencyInput.value;
    chrome.runtime.sendMessage({
      getExchangeRate: true,
      targetCurrency
    });
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