import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import '../stylesheets/wallet.css';
import Header from './Header';

// import variables from .env file
const address = import.meta.env.VITE_WALLET_ADDRESS;
const privateKey = import.meta.env.VITE_PRIVATE_KEY;
const rpcEndpoint = import.meta.env.VITE_RPC_ENDPOINT;

// connect to blockchain via infura endpoint
const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint));

// contract abi that is used for adding new tokens to the wallet
const abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MaxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressMintCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"adminMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hiddenMetadataUri","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ids","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintAmountPerTx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"mintForAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_state","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uriPrefix","type":"string"}],"name":"setUriPrefix","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uriSuffix","type":"string"}],"name":"setUriSuffix","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uriPrefix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uriSuffix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"walletOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]');

const tokenDB = [];

function Wallet() {
  // declare local state variables using React useState hooks
  const [tokenAddress, setTokenAddress] = useState('');
  const [transferQuantity, setTransferQuantity] = useState('');
  const [transferAddress, setTransferAddress] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [tokenList, setTokenList] = useState([]);
  const [addTokenAddress, setAddTokenAddress] = useState('');
  const [transferType, setTransferType] = useState('transferEth');

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

  async function addToken() {
    // instantiate token contract via web3js (need valid token address)
    const tokenContract = new web3.eth.Contract(abi, addTokenAddress);
    let newToken = true;
    // make sure the contract for the token that you are trying to add has a correctly formatted abi
    // check to make sure this token address is not already being tracket
    tokenDB.forEach((token) => {
      if (token.tokenAddress === addTokenAddress) {
        // user is trying to add a duplicate token --> update boolean flag
        console.log('That token is already being tracked!');
        newToken = false;
      }
    });
    const balance = await tokenContract.methods.balanceOf(address).call();
    // convert balance from wei to ERC-20 equivalent of ETH denomination
    const tokenBalance = web3.utils.fromWei(balance.toString(), 'Ether');
    // get token name from contract instance
    const tokenName = await tokenContract.methods.name().call();
    const tokenInfo = {
      // assign a unique token number for mapping table row keys
      // assigning to the length of array + 1 will ensure it is always the token we are adding
      tokenNumber: tokenList.length + 1,
      tokenName,
      tokenAddress: addTokenAddress,
      tokenBalance,
    };
    // ideally would use a database to store token info for each wallet address
    // use array to push new token object literals, then update state with current array
    if (newToken === true) {
      // only update state if user is adding a novel token
      tokenDB.push(tokenInfo);
      setTokenList(tokenDB);
    }
  }

  return (
    <div className="wallet">
      <Header
        address={address}
        ethBalance={ethBalance}
      />
      <div className="body">
        <b>Tokens</b>
      </div>
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
        Add Token:
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
      <div className="transfer">
        <label htmlFor="transferEth">
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
    </div>
  );
}

export default Wallet;
