// ================================================
export function calculateSimpleMath(num1, num2, operator) {

    const firstNumber = parseFloat(num1);
    const secondNumber = parseFloat(num2);

    let result;
    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0)
                return "Cannot divide by zero";
            result = firstNumber / secondNumber;
            break;
        default:
            throw new Error("Invalid Operator");
    }

    return result;
}
// ================================================
export function calculateSimpleCompoundInterest(principal, rateOfInterest, periodYear) {
    return principal * (rateOfInterest * 0.01) * periodYear;
}
// ================================================
export async function calculateCurrencyExchange(sourceCurrencyAbbr, destCurrencyAbbrList) {
    const destCurrencyFormatted = destCurrencyAbbrList.join("%2C");

    const apiURL = `https://api.currencyapi.com/v3/latest?apikey=${import.meta.env.VITE_CURRENCY_API_KEY}&currencies=${destCurrencyFormatted}&base_currency=${sourceCurrencyAbbr}`;

    // Debug
    console.log("Full URL: " + apiURL);

    const response = await fetch(apiURL);

    // Debug
    //console.log("Response.", response);

    const result = await response.json();

    // Debug
    //console.log("Result.", result);

    // Successful
    if (response.status === 200) {
        const currencyData = result.data;
        return currencyData;
    }
    // Failed
    else {
        throw new Error("Something went wrong with the Currency Exchange API");
    }
}
// ================================================