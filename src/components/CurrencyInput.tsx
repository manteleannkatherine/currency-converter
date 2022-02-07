import {useState} from 'react';
import PropTypes from 'prop-types';

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency : PropTypes.string.isRequired,
    currencies: PropTypes.array
}

function CurrencyInput(props : any) {
    
    const [amountValue, setAmountValue] = useState(1);
    const [currencyValue, setCurrencyValue] = useState([]);

    const handleAmountChange = (e : any) => {
        setAmountValue(e.target.value);
    }

    const handleCurrencyChange = (e : any) => {
        setCurrencyValue(e.target.value);
    }
    
    return (
        <div className="group">
            <input 
                type="text" 
                value={props.amount} 
                onChange={(e) => handleAmountChange(e)} />
            <select 
                value={props.currency} 
                onChange={(e) => handleCurrencyChange(e)}>
                {props.currencies.map((currency : any) => (
                    <option value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
}

export default CurrencyInput;