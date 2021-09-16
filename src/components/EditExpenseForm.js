import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import CurrencySelect from './CurrencySelect';
import PaymentSelect from './PaymentSelect';
import TagSelect from './TagSelect';
import { actionFetchApiExchangeRates } from '../actions';

class EditExpenseForm extends Component {
  constructor(props) {
    super(props);

    const { expenses } = this.props;
    const { value, description, currency, method, tag } = expenses[0];

    this.state = {
      value,
      description,
      currency,
      method,
      tag,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { fetchApiExchangeRates } = this.props;
    fetchApiExchangeRates(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <section>
        <Input
          name="value"
          label="Valor: "
          type="text"
          value={ value }
          placeholder="Insira o valor da despesa"
          onChange={ this.handleChange }
        />
        <Input
          name="description"
          label="Descrição: "
          type="text"
          value={ description }
          placeholder="Insira descrição da despesa"
          onChange={ this.handleChange }
        />
        <CurrencySelect
          value={ currency }
          onChange={ this.handleChange }
        />
        <PaymentSelect
          value={ method }
          onChange={ this.handleChange }
        />
        <TagSelect
          value={ tag }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </section>
    );
  }
}

EditExpenseForm.propTypes = {
  fetchApiExchangeRates: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiExchangeRates: (state) => dispatch(actionFetchApiExchangeRates(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);
