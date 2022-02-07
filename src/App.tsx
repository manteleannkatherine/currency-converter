import './App.css';
import CurrencyInput from './components/CurrencyInput';
import {useState,useEffect} from "react";
import axios from 'axios';

function App() {

  const [amountFrom, setAmountFrom] = useState(1);
  const [amountTo, setAmountTo] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('USD');

  const [rates, setRates] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios.get(`https://github.com/fawazahmed0/currency-api/tree/1/${date.toISOString().slice(0, 10)}`)
      .then(res => { 
        try {
          setRates(res.data.rates);
        }
        catch {
          console.log("Exceeded API call limit")
        }
      }
    )}, [rates]);

  

  const handleAmountChange = (amountFrom : number) => {
    setAmountTo(amountFrom * rates[0] / rates[1]);
    setAmountFrom(amountFrom)
  }

  const handleCurrencyChange = (currency : string) => {
    setAmountTo(amountFrom * rates[0] / rates[1]);
    setCurrencyFrom(currency);
  }
  
  return (
    <div>
      <CurrencyInput 
        currencies={Object.keys(rates)} 
        amount={amountFrom} 
        currency={currencyFrom} />
      <CurrencyInput 
        currencies={Object.keys(rates)} 
        amount={amountTo} 
        currency={currencyTo} />
    </div>
  );
}

export default App;