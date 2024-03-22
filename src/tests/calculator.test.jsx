// ================================================
import { test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from '../Calculator';
// ================================================
// Addition Unit Testing
test("calculate addition", async () => {
    render(<Calculator />);

    const firstNumInput = screen.getByPlaceholderText("First number");
    userEvent.type(firstNumInput, "5");
    await waitFor(() => {
        expect(firstNumInput.value).toBe("5");
    });

    const operatorSelect = screen.getByRole("combobox");
    userEvent.selectOptions(operatorSelect, "+");

    const secondNumInput = screen.getByPlaceholderText("Second number");
    userEvent.type(secondNumInput, "7");
    await waitFor(() => {
        expect(secondNumInput.value).toBe("7");
    });

    userEvent.click(screen.getByTestId("math-button"), { name: "=" });
    await waitFor(() => {
        expect(screen.getByPlaceholderText("Your Mathematical Operation Result is...").value).toBe("12");
    });
});
// ================================================
// Subtraction Unit Testing
test("calculate subtraction", async () => {
    render(<Calculator />);

    const firstNumInput = screen.getByPlaceholderText("First number");
    userEvent.type(firstNumInput, "3");
    await waitFor(() => {
        expect(firstNumInput.value).toBe("3");
    });

    const operatorSelect = screen.getByRole("combobox");
    userEvent.selectOptions(operatorSelect, "-");

    const secondNumInput = screen.getByPlaceholderText("Second number");
    userEvent.type(secondNumInput, "2");
    await waitFor(() => {
        expect(secondNumInput.value).toBe("2");
    });

    userEvent.click(screen.getByTestId("math-button"), { name: "=" });
    await waitFor(() => {
        expect(screen.getByPlaceholderText("Your Mathematical Operation Result is...").value).toBe("1");
    });
});
// ================================================
// Multiplication Unit Testing
test("calculate multiplication", async () => {
    render(<Calculator />);

    const firstNumInput = screen.getByPlaceholderText("First number");
    userEvent.type(firstNumInput, "12");
    await waitFor(() => {
        expect(firstNumInput.value).toBe("12");
    });

    const operatorSelect = screen.getByRole("combobox");
    userEvent.selectOptions(operatorSelect, "*");

    const secondNumInput = screen.getByPlaceholderText("Second number");
    userEvent.type(secondNumInput, "13");
    await waitFor(() => {
        expect(secondNumInput.value).toBe("13");
    });

    userEvent.click(screen.getByTestId("math-button"), { name: "=" });
    await waitFor(() => {
        expect(screen.getByPlaceholderText("Your Mathematical Operation Result is...").value).toBe("156");
    });
});
// ================================================
// Division Unit Testing - Valid Number
test("calculate division", async () => {
    render(<Calculator />);

    const firstNumInput = screen.getByPlaceholderText("First number");
    userEvent.type(firstNumInput, "35");
    await waitFor(() => {
        expect(firstNumInput.value).toBe("35");
    });

    const operatorSelect = screen.getByRole("combobox");
    userEvent.selectOptions(operatorSelect, "/");

    const secondNumInput = screen.getByPlaceholderText("Second number");
    userEvent.type(secondNumInput, "7");
    await waitFor(() => {
        expect(secondNumInput.value).toBe("7");
    });

    userEvent.click(screen.getByTestId("math-button"), { name: "=" });
    await waitFor(() => {
        expect(screen.getByPlaceholderText("Your Mathematical Operation Result is...").value).toBe("5");
    });
});
// ================================================
// Division Unit Testing - Divide by Zero
test("calculate division - Zero", async () => {
    render(<Calculator />);

    const firstNumInput = screen.getByPlaceholderText("First number");
    userEvent.type(firstNumInput, "100");
    await waitFor(() => {
        expect(firstNumInput.value).toBe("100");
    });

    const operatorSelect = screen.getByRole("combobox");
    userEvent.selectOptions(operatorSelect, "/");

    const secondNumInput = screen.getByPlaceholderText("Second number");
    userEvent.type(secondNumInput, "0");
    await waitFor(() => {
        expect(secondNumInput.value).toBe("0");
    });

    userEvent.click(screen.getByTestId("math-button"), { name: "=" });
    await waitFor(() => {
        expect(screen.getByPlaceholderText("Your Mathematical Operation Result is...").value).toBe("Cannot divide by zero");
    });
});
// ================================================
// Simple Compound Interest Unit Testing
test("calculate compound interest", async () => {
    render(<Calculator />);

    const compoundInterestInput = screen.getByPlaceholderText("Compound Interest");
    userEvent.type(compoundInterestInput, "2000");
    await waitFor(() => {
        expect(compoundInterestInput.value).toBe("2000");
    });

    const rateOfInterestInput = screen.getByPlaceholderText("Rate of Interest");
    userEvent.type(rateOfInterestInput, "5");
    await waitFor(() => {
        expect(rateOfInterestInput.value).toBe("5");
    });

    const durationInput = screen.getByPlaceholderText("Duration (Years)");
    userEvent.type(durationInput, "2");
    await waitFor(() => {
        expect(durationInput.value).toBe("2");
    });

    userEvent.click(screen.getByTestId("compound-interest-button"), { name: "=" });
    await waitFor(() => {
        expect(screen.getByPlaceholderText("Your Projected Compound Interest is...").value).toBe("200");
    });
});
// ================================================
// Simple Currency Exchange Unit Testing
test("calculate currency exchange", async () => {
    render(<Calculator />);

    // Type out "USD" in the Source Currency Abbreviation Input Field
    const sourceCurrencyAbbrInput = screen.getByPlaceholderText("Source Currency ABBR");
    userEvent.clear(sourceCurrencyAbbrInput);
    userEvent.type(sourceCurrencyAbbrInput, "USD");
    await waitFor(() => {
        expect(sourceCurrencyAbbrInput.value).toBe("USD");
    });

    // Type out "30" in the Source Currency Value Input Field
    const sourceCurrencyValueInput = screen.getByPlaceholderText("Source Currency Value");
    userEvent.clear(sourceCurrencyValueInput);
    userEvent.type(sourceCurrencyValueInput, "30");
    await waitFor(() => {
        expect(sourceCurrencyValueInput.value).toBe("30");
    });
    // ============
    // Clicks on the button 3 times, and inputting "EUR", "MYR", "SGD" in the corresponding newly created input fields.
    userEvent.click(screen.getByTestId("add-destination-currency-button"), { name: "+" });
    await waitFor(() => screen.getByPlaceholderText("Destination Currency #1"));
    const destinationCurrencyAbbrInput1 = screen.getByPlaceholderText("Destination Currency #1");
    userEvent.type(destinationCurrencyAbbrInput1, "EUR");
    await waitFor(() => {
        expect(destinationCurrencyAbbrInput1.value).toBe("EUR");
    });

    userEvent.click(screen.getByTestId("add-destination-currency-button"), { name: "+" });
    await waitFor(() => screen.getByPlaceholderText("Destination Currency #2"));
    const destinationCurrencyAbbrInput2 = screen.getByPlaceholderText("Destination Currency #2");
    userEvent.type(destinationCurrencyAbbrInput2, "MYR");
    await waitFor(() => {
        expect(destinationCurrencyAbbrInput2.value).toBe("MYR");
    });

    userEvent.click(screen.getByTestId("add-destination-currency-button"), { name: "+" });
    await waitFor(() => screen.getByPlaceholderText("Destination Currency #3"));
    const destinationCurrencyAbbrInput3 = screen.getByPlaceholderText("Destination Currency #3");
    userEvent.type(destinationCurrencyAbbrInput3, "SGD");
    await waitFor(() => {
        expect(destinationCurrencyAbbrInput3.value).toBe("SGD");
    });
    // ============
    // After all input fields are created, click on the submit button to get the results.
    userEvent.click(screen.getByTestId("currency-exchange-button"), { name: "Submit" });
    await waitFor(() => {
        const inputValue = screen.getByTestId("destination-currency-values-#1").value;

        // Check if the first number of the destination currency value input fields is a valid number.
        expect(inputValue).not.toBe("Undetermined");
    }, { timeout: 5000 });
    const inputValue = screen.getByTestId("destination-currency-values-#1").value;

    // Debug
    //console.log("[Resultant Currency] First Input (EUR).", inputValue);

    // Check if the first number of the destination currency value input fields is a valid number.
    expect(parseFloat(inputValue)).toBeTypeOf("number");
    // ============
});
// ================================================