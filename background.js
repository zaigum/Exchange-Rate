
 
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.getExchangeRate) {
    const targetCurrency = message.targetCurrency || 'PKR  ' ;  
    fetchExchangeRate(targetCurrency);
  }
});

async function fetchExchangeRate(targetCurrency) {
  try {
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const exchangeRate = data.rates[targetCurrency];

     chrome.runtime.sendMessage({ exchangeRate });
  } catch (error) {
    console.error(error);
  }
}


// Call the fetchExchangeRate function when the extension is loaded
fetchExchangeRate();

 