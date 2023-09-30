// Import the dotenv package and load the environment variables
require('dotenv').config();

// Access the API key
const apiKey = process.env.API_KEY;

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
  
    // Populate currency options dynamically (sample)
    function populateCurrencyOptions() {
      // Replace this with code to fetch currency options from an API or another data source
      const currencies = ["USD", "EUR", "GBP", "JPY", "CAD"]; // Sample currency list
  
      // Clear existing options
      fromCurrencySelect.innerHTML = "";
      toCurrencySelect.innerHTML = "";
  
      // Add currency options to both select elements
      currencies.forEach((currency) => {
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