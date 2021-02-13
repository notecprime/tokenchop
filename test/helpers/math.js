function quoteToBase(price, quote) {
    const decimals = web3.utils.toWei(web3.utils.toBN(1), 'ether');
    const result = quote.mul(decimals).div(price);
    return result;
};

function baseToQuote(price, base) {
    const decimals = web3.utils.toWei(web3.utils.toBN(1), 'ether');
    const result = base.mul(price).div(decimals);
    return result;        
};

function toEth(wei, decimals) {
    decimals = decimals || 8;
    if (typeof wei === 'string') {
        wei = web3.utils.toBN(wei);
    }
    const divr = web3.utils.toBN(10**(18-decimals));
    return web3.utils.fromWei(wei.div(divr).mul(divr));
};

function fromEth(ether) {
    if (typeof ether === 'number') {
        ether = ether.toString();
    }
    return web3.utils.toBN(web3.utils.toWei(ether));
};

function nearly(p1, p2, decimals) {
    decimals = decimals || 8;    
    const zero = web3.utils.toBN(0);
    const diff = p1 < p2 ? toEth(p2.sub(p1)) : toEth(p1.sub(p2));
    const [noDecimalsDiff] = diff.split('.');
    return web3.utils.toBN(noDecimalsDiff).eq(zero);
};

module.exports = {
    quoteToBase,
    baseToQuote,
    toEth,
    fromEth,
    nearly
};

