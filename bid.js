contract Bid {
    mapping (address => uint) public totalBids;
    mapping (uint => address) miningReward;
    
    event BidSold(address sender, address receiver, uint bidCount);

    address public owner;
    
    /* Initializes contract with initial supply Bids to the creator of the contract */
    function Bid(uint initialBids) {
	if (initialBids == 0){
	    initialBids = 10000;
	}

	owner = msg.sender;
	totalBids[msg.sender] = initialBids;
    }

    /*Sell the bids. Only the owner of the bidding game can sell the bids*/
    function sellBid(address receiver, uint bidCount) returns(bool sufficient) {
	/*Only the owner of the bidding agency can sell bids*/
	if(msg.sender != owner){
	    return false;
	}

	/*Either all bids sold, or max bids requested*/
	if (totalBids[owner] < bidCount){
	    return false;
	}
	
	totalBids[owner] -= bidCount;
	totalBids[receiver] += bidCount;

	BidSold(owner, receiver, bidCount);

	return true;
    }

    function getEther(){
	
    }
    
    function claimMiningReward() {
	if (miningReward[block.number] == 0) {
	    totalBids[block.coinbase] += 1;
	    miningReward[block.number] = block.coinbase;
	}
    }
}
