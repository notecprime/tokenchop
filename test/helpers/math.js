module.exports = {
    quoteToBase: (price, quote) => {
        const decimals = web3.utils.toWei(web3.utils.toBN(1), 'ether');
        const result = quote.mul(decimals).div(price);
        return result;
    },
    baseToQuote: (price, base) => {
        const decimals = web3.utils.toWei(web3.utils.toBN(1), 'ether');
        const result = base.mul(price).div(decimals);
        return result;        
    }
  };
