# web3-wallet

Application for monitoring and transferring token balances

# Instructions

## Installation

1. Clone this repository to your local machine
2. Install dependencies by nagivating to the web3-wallet subdirectory of the repository and typing `npm install` into your terminal

## Configuration

1. Before you run the application, you must replace some placeholder text with your wallet address and private key
2. Navigate to the Wallet component within the located at web3-wallet\src\components\Wallet.jsx
3. On line 10, replace 'YOUR WALLET ADDRESS' with your wallet address - do not delete the '', it must still be a string
4. On line 30, replace 'YOUR PRIVATE KEY' with the private key that corresponds to the wallet address that you entered in step 3 - do not delete the '' - it must still be a string

## Using the Application

1. Type `npm run dev` and navigate to the address of the dev server in your browser (It should be http://127.0.0.1:5173/)
2. To run test suite, type `npm run test`
