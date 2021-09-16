import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionRemoveExpense, actionEditExpense } from '../actions';

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.convertedValue = this.convertedValue.bind(this);
    this.exchangeUsed = this.exchangeUsed.bind(this);
  }

  convertedValue(item) {
    const { value } = item;
    const exchangeUsed = item.exchangeRates[item.currency].ask;
    const result = value * exchangeUsed;
    return result.toFixed(2);
  }

  exchangeUsed(item) {
    const { ask } = item.exchangeRates[item.currency];
    const askNumber = +ask;
    return askNumber.toFixed(2);
  }

  render() {
    const { expenses, removeExpenseStore, editExpenseStore } = this.props;
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        { expenses.map((item, index) => (
          <tr key={ index }>
            <td>{ item.description }</td>
            <td>{ item.tag }</td>
            <td>{ item.method }</td>
            <td>{ item.value }</td>
            <td>{ item.exchangeRates[item.currency].name }</td>
            <td>{ this.exchangeUsed(item) }</td>
            <td>{ this.convertedValue(item) }</td>
            <td>Real</td>
            <td>
              <button
                type="button"
                value={ index }
                data-testid="delete-btn"
                onClick={ removeExpenseStore }
              >
                Excluir
              </button>
              <button
                type="button"
                value={ index }
                data-testid="edit-btn"
                onClick={ editExpenseStore } // REQUISITO 11
              >
                Editar
              </button>
            </td>
          </tr>
        ))}
      </thead>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  removeExpenseStore: PropTypes.func.isRequired,
  editExpenseStore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpenseStore: ({ target: { value: index } }) => (
    dispatch(actionRemoveExpense(index))
  ),
  editExpenseStore: ({ target: { value: index } }) => (
    dispatch(actionEditExpense(index))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
