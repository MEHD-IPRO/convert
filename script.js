// Set your API key here
const apiKey = '0a71530463b206e35bdbc739';

document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amount");
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convert");
    const resultElement = document.getElementById("result");
  
    // Sample currency conversion function
    function convertCurrency(amount, fromCurrency, toCurrency) {
      // Replace with your currency conversion logic or API calls here
      // Example: You can use exchange rate data to perform the conversion
      // For simplicity, we'll just return the same amount for demonstration
      return amount;
    }
  
    // Add event listener for the convert button
    convertButton.addEventListener("click", function () {
      const amount = parseFloat(amountInput.value);
      const fromCurrency = fromCurrencySelect.value;
      const toCurrency = toCurrencySelect.value;
  
      // Perform currency conversion here
      const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
  
      // Display the result
      resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    });
  
    // Define an array of popular currency options
    const popularCurrencies = [
      "USD", "EUR", "JPY", "GBP", "CHF", "AUD", "CAD", "CNY", "KRW", "SGD",
      "NZD", "INR", "BRL", "ZAR", "RUB", "MXN", "HKD", "NOK", "SEK", "DKK",
      "MYR", "THB", "SAR", "AED", "ARS", "TRY", "EGP", "IDR", "PHP", "MAD"
    ];
  
    // Populate currency options dynamically
    function populateCurrencyOptions() {
      // Clear existing options
      fromCurrencySelect.innerHTML = "";
      toCurrencySelect.innerHTML = "";
  
      // Add a default option (optional)
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select currency";
      fromCurrencySelect.appendChild(defaultOption);
      toCurrencySelect.appendChild(defaultOption.cloneNode(true));
  
      // Add popular currency options to both select elements
      popularCurrencies.forEach((currency) => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrencySelect.appendChild(option1);
  
        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrencySelect.appendChild(option2);
      });
    }
  
    // Call the function to populate currency options
    populateCurrencyOptions();
});