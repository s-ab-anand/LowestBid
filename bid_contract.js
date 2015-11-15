var totalBids = 10000;
var bidContract = web3.eth.contract(bidCompiled.Bid.info.abiDefinition);
var bids = bidContract.new(
    totalBids,
    {
	from:web3.eth.accounts[0],
	data:bidCompiled.Bid.code,
	gas: 1000000
    }, function(e, contract){
	if(!e) {

	    if(!contract.address) {
		console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

	    } else {
		console.log("Contract mined! Address: " + contract.address);
		console.log(contract);
	    }

	}
    })
