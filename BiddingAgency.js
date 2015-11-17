contract BiddingAgency {

    mapping (uint => address) public bidsToUsersMapping;

    event MessageEvent(string msg, uint value);

    uint public bidPrice;
    
    mapping (address => uint) paidUsers;

    struct Bidders {
	address[] bidderAddress;	
    }

    function BiddingAgency(uint _bidPrice){
	bidPrice = _bidPrice;
    }
    
    function placeBid(uint bidValue){
	if(paidUsers[msg.sender] == bidPrice){
	    /*if the bid value already exists*/
	    if(bidsToUsersMapping[bidValue] != 0)
	    {
		address existingBidder = bidsToUsersMapping[bidValue];

		MessageEvent("Bid exists", bidValue);
		
		/*notify the current bidder as well as the existing bidder that the bid is now void*/
	    }else{
		/*Update the bidValue to bidder mapping
		Now bidValue belongs to msg.sender*/
		bidsToUsersMapping[bidValue] = msg.sender;

		MessageEvent("Bid added", bidValue);
	    }
		
	}
    }
    
    function () {
	/*Accumulate the payment in paidUsers*/
	paidUsers[msg.sender] = paidUsers[msg.sender] + msg.value;
	
	MessageEvent("Funds sent", msg.value);	
    }
}
