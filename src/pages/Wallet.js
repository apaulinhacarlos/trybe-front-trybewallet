import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import AddExpenseForm from '../components/AddExpenseForm';
import EditExpenseForm from '../components/EditExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

class Wallet extends Component {
  render() {
    const { edit } = this.props;
    return (
      <>
        <Header />
        { edit ? <EditExpenseForm /> : <AddExpenseForm />}
        <table>
          <ExpenseTable />
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  edit: state.wallet.edit,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
