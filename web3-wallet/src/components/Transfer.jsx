import React from 'react';
import '../stylesheets/transfer.css';

function Transfer({
  setTransferType, setTokenAddress, setTransferQuantity, setTransferAddress, transfer,
}) {
  return (
    <div className="transfer">
      <h3>Transfers</h3>
      <label htmlFor="transferEth">
        <b>Select token to transfer:</b>
        {' '}
        ETH
        <input
          type="radio"
          name="transfer-radio"
          value="transferEth"
          id="transferEth"
          onChange={(e) => {
            setTransferType(e.target.value);
          }}
          defaultChecked
        />
      </label>
      <label htmlFor="transferToken">
        Token
        <input
          type="radio"
          name="transfer-radio"
          value="transferToken"
          id="transferToken"
          onChange={(e) => {
            setTransferType(e.target.value);
          }}
        />
      </label>
      <label htmlFor="transferToken">
        <br />
        Token to Send (Address):
        <br />
        <input
          type="text"
          name="tokenAddressEntry"
          id="tokenAddressEntry"
          placeholder="0x...."
          onChange={(e) => {
            setTokenAddress(e.target.value);
          }}
        />
      </label>
      <label htmlFor="recipientAddress">
        <br />
        Address to send to:
        <br />
        <input
          type="text"
          name="recipientAddress"
          id="recipientAddress"
          placeholder="0x...."
          onChange={(e) => {
            setTransferAddress(e.target.value);
          }}
        />
      </label>
      <label htmlFor="amountToSend">
        <br />
        Amount:
        <br />
        <input
          type="text"
          name="amountToSend"
          id="amountToSend"
          placeholder="E.g., 1.01"
          onChange={(e) => {
            setTransferQuantity(e.target.value);
          }}
        />
      </label>
      <div className="transferBtn">
        <button
          type="submit"
          onClick={() => transfer()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Transfer;
