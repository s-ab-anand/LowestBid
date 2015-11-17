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


    /*This function allows the user to bet by sending his lowest bid guess. He can place as many bids as he wishes until his balance is finished*/
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

		/*Implement this function*/
		/*notifyConflict(bidValue, msg.sender, existingBidder);*/

		/*Reset the mapping to 0*/
		bidsToUsersMapping[bidValue] = 0;		
	    }else{
		/*Update the bidValue to bidder mapping
		  Now bidValue belongs to msg.sender*/
		
		bidsToUsersMapping[bidValue] = msg.sender;		
		MessageEvent("Bid added", bidValue);
	    }
		
	}else{
	    MessageEvent("Insufficient funds. Please send more ethers and try again", -1);
	}
    }

    /*This function gets called when a user pays the agency using eth.sendTransaction*/
    function () {
	/*Accumulate the payment in paidUsers*/
	paidUsers[msg.sender] = paidUsers[msg.sender] + msg.value;
	
	MessageEvent("Funds received", msg.value);	
    }
}
