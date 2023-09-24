const apiKey = 'de904f3177731b45b3f2cf27 '; // Replace with your actual API key
const targetCurrency = 'EUR'; // Replace 'EUR' with the currency code you want to display

async function fetchExchangeRate() {
    try {
      const apiUrl = `https://v6.exchangeratesapi.io/latest?base=USD`;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const exchangeRate = data.rates[targetCurrency];
      // Store the exchange rate data in local storage or pass it to content or popup script
      chrome.storage.local.set({ exchangeRate: exchangeRate });
    } catch (error) {
      console.error(error);
    }
  }
  