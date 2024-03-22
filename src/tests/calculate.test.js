
import { test } from 'vitest';
import { 
    calculateSimpleMath, 
    calculateSimpleCompoundInterest, 
    calculateCurrencyExchange 
} from '../calculate.js';

test('calculate addition', ({ expect }) => {
    expect(calculateSimpleMath(5, 7, "+")).toBe(12);
});

test('calculate subtraction', ({ expect }) => {
    expect(calculateSimpleMath(5, 7, "-")).toBe(-2);
});

test('calculate multiplication', ({ expect }) => {
    expect(calculateSimpleMath(9, 5, "*")).toBe(45);
});

test('calculate division', ({ expect }) => {
    expect(calculateSimpleMath(165, 15, "/")).toBe(11);
});

test('calculate division by zero', ({ expect }) => {
    expect(calculateSimpleMath(2, 0, "/")).toBe("Cannot divide by zero");
});

test('calculate invalid operator', ({ expect }) => {
    expect(() => calculateSimpleMath(5, 7, "!==")).toThrowError("Invalid Operator");
});

test('calculate compound interest', ({ expect }) => {
    expect(calculateSimpleCompoundInterest(2000, 5, 2)).toBe(200);
});

test('calculate currency exchange', async ({ expect }) => {
    await expect(calculateCurrencyExchange("USD", ["EUR", "SGD", "MYR"])).resolves.toEqual(
        expect.objectContaining({
            "EUR": expect.objectContaining({
                "code": "EUR",
                "value": expect.any(Number)
            }),
            "SGD": expect.objectContaining({
                "code": "SGD",
                "value": expect.any(Number)
            }),
            "MYR": expect.objectContaining({
                "code": "MYR",
                "value": expect.any(Number)
            }),
        })
    );
})

test('calculate currency exchange w/ error', async ({ expect }) => {
    await expect(() => calculateCurrencyExchange("USD", ["acbasdsdawd"])).rejects.
    toThrowError("Something went wrong with the Currency Exchange API");
})