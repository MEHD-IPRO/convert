// Set your API key here
const apiKey = '0a71530463b206e35bdbc739';

document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amount");
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convert");
    const resultElement = document.getElementById("result");

    // Currency conversion function using ExchangeRate-API
    function convertCurrency(amount, fromCurrency, toCurrency) {
        const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    const exchangeRate = data.conversion_rates[toCurrency];
                    const convertedAmount = (amount * exchangeRate).toFixed(2);
                    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                } else {
                    resultElement.textContent = `API request failed: ${data['error-type']}`;
                }
            })
            .catch(error => {
                resultElement.textContent = `Error: ${error}`;
            });
    }

    // Add event listener for the convert button
    convertButton.addEventListener("click", function () {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        // Check if amount is valid
        if (isNaN(amount)) {
            resultElement.textContent = "Please enter a valid amount.";
        } else {
            // Perform currency conversion
            convertCurrency(amount, fromCurrency, toCurrency);
        }
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