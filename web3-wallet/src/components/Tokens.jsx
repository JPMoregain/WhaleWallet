import React from 'react';
import '../stylesheets/tokens.css';

function Tokens({ tokenList, setAddTokenAddress, addToken }) {
  return (
    <div className="tokenInfo">
      <h3>Tracked Tokens</h3>
      <div className="tokenTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {
              // map current state of the token list into rows to populate table
              tokenList.map((token) => (
                // use tokenNumber to assign unique key
                <tr key={token.tokenNumber}>
                  <td>{token.tokenName}</td>
                  <td>{token.tokenAddress}</td>
                  <td>{token.tokenBalance}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div>
        <input
          id="tokenInput"
          type="text"
          onChange={(event) => setAddTokenAddress(event.target.value)}
          placeholder="Enter token address"
        />
      </div>
      <div>
        <button
          type="submit"
          onClick={() => addToken()}
        >
          Add Token
        </button>
      </div>
    </div>
  );
}

export default Tokens;
