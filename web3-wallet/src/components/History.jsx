import React from 'react';

function History({ txHistory }) {
  return (
    <div className="historyTable">
      Transaction History
      <table>
        <thead>
          <tr>
            <th>Token Address</th>
            <th>Transfer Amount</th>
            <th>Tx Hash</th>
          </tr>
        </thead>
        <tbody>
          {
                // map the current state of txHistory to the table
                txHistory.map((tx) => (
                  // use transaction number from object to assign a unique key for each table entry
                  // for each row, create a td cell for address, amount, and hash
                  <tr key={tx.txNumber}>
                    <td>{tx.tokenAddress}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.txInfo}</td>
                  </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  );
}

export default History;
