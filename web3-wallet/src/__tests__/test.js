import * as React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App';
import Tokens from '../components/Tokens';

describe('test suite', () => {
  it('renders the app component', () => {
    render(<App />);
  });
  it('renders the tokens component', () => {
    const tokenList = [1, 2, 3];
    render(<Tokens tokenList={tokenList} />);
  });
  test('Tokens component renders the correct number of tokens', () => {
    const tokenList = [1, 2, 3];
    render(<Tokens tokenList={tokenList} />);
    const tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toEqual(tokenList.length);
  });
});
