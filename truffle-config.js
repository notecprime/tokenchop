const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas: 160928184,
      disableConfirmationListener: true            
     },
     staging: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      gas: 160928184,
      disableConfirmationListener: true            
     },     
     testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 0,
      networkCheckTimeout: 1000000,     
      timeoutBlocks: 200,
      skipDryRun: true      
    }
},

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      version: "0.7.6"
    }
  },
  plugins: [
    'truffle-contract-size'
  ]  
};
