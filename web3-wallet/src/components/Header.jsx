import React, { useState } from 'react';
import '../stylesheets/header.css';

function Header({ address, ethBalance, setPrivateKey }) {
  const [newKey, setNewKey] = useState('');

  const updatePrivateKey = () => {
    setPrivateKey(newKey);
  };

  return (
    <div className="header">
      <div>
        <h3>Wallet Address:</h3>
        {address}
        <br />
        <h3>Balance</h3>
        {ethBalance}
        {' '}
        ETH
      </div>
      <div className="privKey">
        <input
          type="text"
          name="newPrivKey"
          id="newPrivKey"
          placeholder="Update Private Key"
          onChange={(e) => {
            setNewKey(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => updatePrivateKey()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Header;
