// Set your API key here
const apiKey = '0a71530463b206e35bdbc739';

document.addEventListener("DOMContentLoaded", function () {
    const amountInput = document.getElementById("amount");
    const fromCurrencySelect = document.getElementById("fromCurrency");
    const toCurrencySelect = document.getElementById("toCurrency");
    const convertButton = document.getElementById("convert");
    const resultElement = document.getElementById("result");

    // Function to fetch exchange rates from the API
    async function fetchExchangeRates(fromCurrency) {
        try {
            const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.result === 'success') {
                const exchangeRate = data.conversion_rates[toCurrencySelect.value];

                if (exchangeRate) {
                    const amount = parseFloat(amountInput.value);

                    if (!isNaN(amount) && amount > 0) {
                        const convertedAmount = (amount * exchangeRate).toFixed(2);
                        resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrencySelect.value}`;
                    } else {
                        resultElement.textContent = "Please enter a valid positive amount.";
                    }
                } else {
                    resultElement.textContent = "Invalid currency selection.";
                }
            } else {
                resultElement.textContent = `API request failed: ${data['error-type']}`;
            }
        } catch (error) {
            resultElement.textContent = `Error: ${error}`;
        }
    }

    // Add event listener for the convert button
    convertButton.addEventListener("click", function () {
        if (fromCurrencySelect.value === toCurrencySelect.value) {
            resultElement.textContent = "Select different currencies for conversion.";
        } else {
            fetchExchangeRates(fromCurrencySelect.value);
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
        const defaultOption = new Option("Select currency", "");

        fromCurrencySelect.innerHTML = "";
        fromCurrencySelect.add(defaultOption);

        toCurrencySelect.innerHTML = "";
        toCurrencySelect.add(defaultOption.cloneNode(true));

        popularCurrencies.forEach((currency) => {
            const option = new Option(currency, currency);
            fromCurrencySelect.add(option);
            toCurrencySelect.add(option.cloneNode(true));
        });
    }

    // Call the function to populate currency options
    populateCurrencyOptions();
});

// Code for converting currency
document.getElementById("convertButton").addEventListener("click", function () {
    // Get the input values
    const amountInput = document.getElementById("amount");
    const fromCurrencyDropdown = document.getElementById("fromCurrency");
    const toCurrencyDropdown = document.getElementById("toCurrency");
    const resultText = document.getElementById("result");

    // Fetch currency conversion data from API
    fetch("https://v6.exchangerate-api.com/v6/0a71530463b206e35bdbc739/latest/USD")
        .then(response => response.json())
        .then(data => {
            // Get the selected currencies and amount
            const fromCurrency = fromCurrencyDropdown.value;
            const toCurrency = toCurrencyDropdown.value;
            const amount = parseFloat(amountInput.value);

            if (!isNaN(amount)) {
                // Perform the currency conversion
                const conversionRate = data.conversion_rates[toCurrency] / data.conversion_rates[fromCurrency];
                const convertedAmount = (amount * conversionRate).toFixed(2);

                // Update the result text
                resultText.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                resultText.textContent = "Enter a valid amount.";
            }
        })
        .catch(error => console.error("Error fetching data: ", error));
});