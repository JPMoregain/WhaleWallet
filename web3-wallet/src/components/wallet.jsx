import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import '../stylesheets/wallet.css';

// import variables from .env file
const address = import.meta.env.VITE_WALLET_ADDRESS;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const rpcEndpoint = import.meta.env.VITE_RPC_ENDPOINT;

// connect to blockchain via infura endpoint
const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint));

// contract abi that is used for adding new tokens to the wallet
const abi = JSON.parse('[{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"initialBalance_","type":"uint256"},{"internalType":"address payable","name":"feeReceiver_","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"generator","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]');

function Wallet(props) {
  // declare local state variables using React useState hooks
  const [tokenAddress, setTokenAddress] = useState('');
  const [transferQuantity, setTransferQuantity] = useState('');
  const [transferAddress, setTransferAddress] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [tokenList, setTokenList] = useState([]);
  const [addTokenAddress, setAddTokenAddress] = useState('');

  const getEthBalance = async () => {
    // get balance of ether in the wallet, which will be returned in wei from web3
    const currBalance = await web3.eth.getBalance(address);
    // convert balance from wei to ether
    const balanceInEth = web3.utils.fromWei(currBalance.toString(), 'Ether');
    // update state with calculated ether balance
    setEthBalance(balanceInEth);
  };

  useEffect(() => {
    getEthBalance();
  }, []);

  // function for adding tokens by address that are tracked and displayed by the wallet
  const addToken = async () => {
    // look for matching token address on blockchain
    const contractAddress = new web3.eth.Contract(abi, addTokenAddress);
    // obtain the balance of that particular token (wei)
    const balance = await contractAddress.methods.balanceOf(address).call();
    // convert balance to ETH (ERC-20 equivalent) denomination for readability
    const convertedBalance = web3.utils.fromWei(balance.toString(), 'Ether');
    const tokenName = await contractAddress.methods.name().call();
    console.log(tokenName);
    const tokenData = {

    };
  };

  return (
    <div className="wallet">
      <div className="header">
        {address}
        {' '}
        :
        {ethBalance}
        {' '}
        ETH
      </div>
      <div className="body">
        <b>Tokens</b>
      </div>
      <div className="tokenTable">
        <table>
          <thead>
            <tr>
              <th>Token Address</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        Add Token:
      </div>
      <div>
        <input
          id="tokenInput"
          type="text"
          onChange={(event) => setTokenAddress(event.target.value)}
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

export default Wallet;
