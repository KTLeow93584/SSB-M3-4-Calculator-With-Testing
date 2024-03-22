import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { calculateSimpleMath, calculateSimpleCompoundInterest, calculateCurrencyExchange } from './calculate.js';

export default function Calculator() {
    return (
        <Container fluid>
            <h1 className="my-4">Calculator</h1>
            <hr />
            <MathCalculator />
            <hr />
            <SimpleCompoundInterestCalculator />
            <hr />
            <CalculateExchangeRate />
            <hr />
        </Container>
    );
}

function MathCalculator() {
    const [state, setState] = useState({
        num1: "",
        num2: "",
        operator: "+",
        result: ""
    });

    const computeResult = () => {
        const result = calculateSimpleMath(state.num1, state.num2, state.operator);
        setState({ ...state, result });
    };

    return (
        <>
            <h4 className="my-3">Simple Mathematical Calculation</h4>
            <Row>
                <Col className="col-sm-2 col-4 mb-3">
                    <Form.Control
                        className="text-center"
                        value={state.num1}
                        onChange={(event) => setState({ ...state, num1: event.target.value })}
                        placeholder="First number" />
                </Col>
                <Col className="col-sm-1 col-4 mb-3">
                    <Form.Control
                        as="select"
                        className="text-center"
                        value={state.operator}
                        onChange={(event) => setState({ ...state, operator: event.target.value })}
                        placeholder="Operator">
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">*</option>
                        <option value="/">/</option>
                    </Form.Control>
                </Col>
                <Col className="col-sm-2 col-4 mb-3">
                    <Form.Control
                        className="text-center"
                        value={state.num2}
                        onChange={(event) => setState({ ...state, num2: event.target.value })}
                        placeholder="Second number" />
                </Col>
                <Col className="col-sm-1 col-3 mb-3">
                    <Button onClick={computeResult} variant="light" data-testid="math-button">
                        =
                    </Button>
                </Col>
                <Col className="col-sm-6 col-8">
                    <Form.Control
                        readOnly
                        className="text-center" value={state.result}
                        placeholder="Your Mathematical Operation Result is..." />
                </Col>
            </Row>
        </>
    );
}

function SimpleCompoundInterestCalculator() {
    const [state, setState] = useState({
        capital: "",
        rateOfInterest: "",
        durationYears: "",
        compoundInterest: ""
    });

    const computeResult = () => {
        const compoundInterest = calculateSimpleCompoundInterest(state.capital, state.rateOfInterest, state.durationYears);
        setState({ ...state, compoundInterest });
    };

    return (
        <>
            <h4 className="my-3">Simple Compound Interest</h4>
            <Row>
                <Col className="col-sm-2 col-4 mb-3">
                    <Form.Control
                        className="text-center"
                        value={state.num1}
                        onChange={(event) => setState({ ...state, capital: event.target.value })}
                        placeholder="Compound Interest" />
                </Col>
                <Col className="col-sm-2 col-4 mb-3">
                    <Form.Control
                        className="text-center"
                        value={state.num1}
                        onChange={(event) => setState({ ...state, rateOfInterest: event.target.value })}
                        placeholder="Rate of Interest" />
                </Col>
                <Col className="col-sm-2 col-4 mb-3">
                    <Form.Control
                        className="text-center"
                        value={state.num2}
                        onChange={(event) => setState({ ...state, durationYears: event.target.value })}
                        placeholder="Duration (Years)" />
                </Col>
                <Col className="col-sm-1 col-3 mb-3">
                    <Button onClick={computeResult} variant="light" data-testid="compound-interest-button">
                        =
                    </Button>
                </Col>
                <Col className="col-sm-5 col-8">
                    <Form.Control
                        readOnly
                        className="text-center" value={state.compoundInterest}
                        placeholder="Your Projected Compound Interest is..." />
                </Col>
            </Row>
        </>
    );
}

function CalculateExchangeRate() {
    // =============================
    const [sourceCurrency, setSourceCurrency] = useState("USD");
    const [sourceAmount, setSourceAmount] = useState(0);
    const [destCurrencies, setDestCurrencies] = useState([]);
    const [results, setResults] = useState({});
    // =============================
    const computeResult = () => {
        calculateCurrencyExchange(sourceCurrency, destCurrencies).then((currencyResultObj) => {
            const resultEntries = Object.values(currencyResultObj);

            // Debug
            //console.log("Results.", resultEntries);

            // Keys 
            const currencyAbbrs = Object.keys(currencyResultObj);

            // Values = Rates
            const rates = resultEntries.map((result) => Math.round((sourceAmount * result.value) * 100) / 100);

            // Debug
            //console.log("Rates.", rates);

            const curObj = currencyAbbrs.reduce((obj, abbr, index) => {
                obj[abbr] = rates[index];
                return obj;
            }, {})

            // Debug
            //console.log("Currency Reformatted Pair Object.", curObj);
            //console.log("Dest Currencies", destCurrencies);

            setResults(curObj);
        }).catch((error) => {
            // Debug
            //console.log("Error.", error);

            setResults({});
        });
    };
    // =============================
    const onDestinationCurrencyChanged = (currency, index) => {
        const newDestCurrencies = [...destCurrencies];
        newDestCurrencies[index] = currency;

        setDestCurrencies(newDestCurrencies);
    };
    // =============================
    const onAddNewDestCurrency = () => {
        const newDestCurrencies = [...destCurrencies, ""];

        setDestCurrencies(newDestCurrencies);
    };

    const onRemoveNewDestCurrency = () => {
        const newDestCurrencies = [...destCurrencies];
        newDestCurrencies.splice(newDestCurrencies.length - 1, 1);

        setDestCurrencies(newDestCurrencies);
    };
    // =============================
    return (
        <>
            <h4 className="my-3">Simple Compound Interest</h4>
            <Row>
                <Col className="col-12 d-flex align-items-center justify-content-evenly mb-3">
                    <Col className="col-6 d-flex justify-content-center">
                        <Form.Label className="text-center" htmlFor="source-currency">Source Currency</Form.Label>
                    </Col>
                    <Col className="col-6 d-flex justify-content-center">
                        <div className="d-flex align-items-center mx-5">
                            <Form.Label className="me-3">Destination Currency</Form.Label>
                            <Button className="me-3"
                                onClick={onAddNewDestCurrency}
                                data-testid="add-destination-currency-button">
                                +
                            </Button>
                            {
                                destCurrencies.length > 0 ? (
                                    <Button className="me-3" onClick={onRemoveNewDestCurrency}>
                                        -
                                    </Button>
                                ) : null
                            }
                            <Form.Control disabled
                                className="text-center"
                                value={destCurrencies.length > 0 ?
                                    `${destCurrencies.filter((destCurrency) => destCurrency.trim().length > 0).join(", ")}` :
                                    ""} />
                        </div>
                    </Col>
                </Col>
                <Col className="col-12 d-flex align-items-start justify-content-evenly mb-3">
                    <Col className="col-5 d-flex mb-3">
                        <Form.Control id="source-currency" className="text-center" value={sourceCurrency}
                            onChange={(event) => setSourceCurrency(event.target.value)}
                            placeholder="Source Currency ABBR" />
                        <Form.Control id="source-amount" className="text-center" type="number"
                            value={sourceAmount}
                            onChange={(event) => setSourceAmount(event.target.value)}
                            placeholder="Source Currency Value" />
                    </Col>
                    <Col className="col-5 mb-3">
                        {
                            destCurrencies.map((destCurrency, index) => (
                                <div className="d-flex" key={`destination-currency-${index}`}>
                                    <Form.Control
                                        className="text-center mb-3"
                                        value={destCurrency}
                                        onChange={(event) => onDestinationCurrencyChanged(event.target.value, index)}
                                        placeholder={`Destination Currency #${index + 1}`} />
                                    <Form.Control disabled
                                        className="text-center mb-3"
                                        data-testid={`destination-currency-values-#${index + 1}`}
                                        value={results[destCurrencies[index]] ? results[destCurrencies[index]] : "Undetermined"} />
                                </div>
                            ))
                        }
                    </Col>
                </Col>
                <Col className="col-12 mb-3">
                    <Button onClick={computeResult} className="w-100" data-testid="currency-exchange-button">
                        Submit
                    </Button>
                </Col>
            </Row>
        </>
    );
}