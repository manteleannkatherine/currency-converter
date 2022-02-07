import './App.css';
import CurrencyInput from './components/CurrencyInput';
import {useState,useEffect} from "react";
import axios from 'axios';

function App() {

  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState('usd');
  const [currencyTo, setCurrencyTo] = useState('aed');
  const [rates, setRates] = useState([]);

  const test_date = useState('2020-12-23');
  const date = test_date.toISOString().slice(0, 10);
  const selectedCurrency = 'usd';

  const BASE_API_URL = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${selectedCurrency}.json`;

  useEffect(() => {
    axios.get(BASE_API_URL)
      .then(res => { 
        try {
          setRates(res.data.rates);

          console.log(rates);
        }
        catch {
          console.log("Exceeded API call limit")
        }
      }
    )}, []);

  useEffect(() => {
    if (!rates) {
      handleAmountFromChange(1);
    }
  }, [rates]);
  
  
  function format(amount : number) {
    return amount.toFixed(4);
  }

  function handleAmountFromChange(amount : number) {
    setAmountTo(amount * rates[1] / rates[0]);
    setAmountFrom(amount);
  }

  function handleCurrencyFromChange(currency : string) {
    setAmountTo(amountFrom * rates[1] / rates[0]);
    setCurrencyFrom(currency);
  }

  function handleAmountToChange(amount : number) {
    setAmountFrom(amount * rates[0] / rates[1]);
    setAmountTo(amount);
  }

  function handleCurrencyToChange(currency : string) {
    setAmountFrom(amountFrom * rates[0] / rates[1]);
    setCurrencyTo(currency);
  }
  
  return (
    <div>
      <h1>Currency Converter</h1>
      <CurrencyInput 
        currencies={Object.keys(rates)} 
        amount={amountFrom} 
        currency={currencyFrom} 
        onAmountChange={handleAmountFromChange}
        onCurrencyChange={handleCurrencyFromChange}
        />
      <CurrencyInput 
        currencies={Object.keys(rates)} 
        amount={amountTo} 
        currency={currencyTo} 
        onAmountChange={handleAmountToChange}
        onCurrencyChange={handleCurrencyToChange}
        />
    </div>
  );
}

export default App;