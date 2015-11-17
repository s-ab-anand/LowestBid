var agencyContract = web3.eth.contract(agencyCompiled.BiddingAgency.info.abiDefinition);
var agencyContract_MessageEvent;
var bidPrice = web3.toWei(2, "ether");
var biddingAgency = agencyContract.new(
    bidPrice,
    {
	from:web3.eth.accounts[0],
	data:agencyCompiled.BiddingAgency.code,
	gas: 1000000
    }, function(e, contract){
	if(!e) {

	    if(!contract.address) {
		console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

	    } else {				
		console.log("BiddingAgency mined! Address: " + contract.address);
		console.log(contract);

		//Now register for the MessageEvent event
		agencyContract_MessageEvent = contract.MessageEvent({}, '', function(error, result){
		    if(!error)
		    {
			console.log(result.args.msg);
			console.log(result.args.value);
		    }
		});
		
	    }

	}
    })
