import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from '../App';
import Tokens from '../components/Tokens';
import History from '../components/History';
import Header from '../components/Header';
import Transfer from '../components/Transfer';

describe('test suite', () => {
  it('renders the app component', () => {
    render(<App />);
  });
  it('renders the tokens component', () => {
    const tokenList = [1, 2, 3];
    render(<Tokens tokenList={tokenList} />);
  });
  test('Tokens component renders the correct number of tokens', () => {
    const tokenList = ['token1', 'token2', 'token3'];
    render(<Tokens tokenList={tokenList} />);
    const tableRows = screen.getAllByRole('row');
    // tokenList.length + 1 to account for header row that will always render
    expect(tableRows.length).toEqual(tokenList.length + 1);
  });
  test('History component renders the correct number of transactions', () => {
    const txHistory = ['tx1', 'tx2', 'tx3', 'tx4', 'tx5'];
    render(<History txHistory={txHistory} />);
    const tableRows = screen.getAllByRole('row');
    // txHistory.length + 1 to account for header row that will always render
    expect(tableRows.length).toEqual(txHistory.length + 1);
  });
  test('Add token button calls the addToken function', () => {
    const addToken = jest.fn();
    const tokenList = ['token1', 'token2', 'token3'];
    render(<Tokens addToken={addToken} tokenList={tokenList} />);
    // select add token button
    const button = screen.getByText('Add Token', { selector: 'button' });
    // click the button
    fireEvent.click(button);
    expect(addToken).toHaveBeenCalled();
  });
  test('Save button updates the private key', () => {
    const setPrivateKey = jest.fn();
    render(<Header setPrivateKey={setPrivateKey} />);
    // select save button
    const button = screen.getByText('Save', { selector: 'button' });
    // click the button
    fireEvent.click(button);
    expect(setPrivateKey).toHaveBeenCalled();
  });
  test('Send button calls the transfer function', () => {
    const transfer = jest.fn();
    render(<Transfer transfer={transfer} />);
    // select save button
    const button = screen.getByText('Send', { selector: 'button' });
    // click the button
    fireEvent.click(button);
    expect(transfer).toHaveBeenCalled();
  });
});
