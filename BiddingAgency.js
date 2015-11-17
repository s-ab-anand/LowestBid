contract BiddingAgency {

    mapping (uint => address) public bidsToUsersMapping;

    /*This map keeps tracks of users who have paid recently
      Stores the address mapped to bidAmount
     */
    mapping (address => uint) paidUsers;
    
    event MessageEvent(string msg, uint value);
    uint public bidPrice;
    
    address public owner;

    struct Bidders {
	address[] bidderAddress;	
    }

    function BiddingAgency(uint _bidPrice){
	bidPrice = _bidPrice;
	owner = msg.sender;
    }
    
    function placeBid(uint bidValue){
	
	/*Check if the user has paid us enough to place a bid*/
	if(paidUsers[msg.sender] >= bidPrice){

	    /*Decrease the user's balance by the price of one bid*/
	    paidUsers[msg.sender] = paidUsers[msg.sender] - bidPrice;
	    
	    /*if the bid has already been placed by someone else*/
	    if(bidsToUsersMapping[bidValue] != 0)
	    {
		address existingBidder = bidsToUsersMapping[bidValue];

		MessageEvent("Bid exists", bidValue);
		
		/*notify the current bidder as well as the existing bidder that the bid is now void*/

		notify(msg.sender, existingBidder);

		/*Reset the mapping to 0*/
		bidsToUsersMapping[bidValue] = 0;		
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
	
	MessageEvent("Funds received", msg.value);	
    }
}
