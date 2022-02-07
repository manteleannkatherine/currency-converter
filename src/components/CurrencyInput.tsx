import './input.css';
import PropTypes from 'prop-types';

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency : PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func
}

function CurrencyInput(props : any) {
    return (
        <div className="group">
            <input 
                type="text" 
                value={props.amount} 
                onChange={(e) => props.onAmountChange(e.target.value)} />
            <select 
                value={props.currency} 
                onChange={(e) => props.onCurrencyChange(e.target.value)}>
                {props.currencies.map((currency : any) => (
                    <option value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
}

export default CurrencyInput;