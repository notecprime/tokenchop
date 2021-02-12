const readFileSync = require('fs').readFileSync;
const execSync = require('child_process').execSync;

const mem = readFileSync('.secret', {encoding: 'utf8'});

execSync(`ganache-cli -m \"${mem}\" --gasLimit 0x99791b8 --allowUnlimitedContractSize -f https://data-seed-prebsc-1-s1.binance.org:8545/`, {stdio: 'inherit'})
//execSync(`ganache-cli -m \"${mem}\" --allowUnlimitedContractSize --db C:\\Temp\\ganacheDb -f https://data-seed-prebsc-1-s1.binance.org:8545/`, {stdio: 'inherit'})