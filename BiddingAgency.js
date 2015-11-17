contract BiddingAgency {

    mapping (uint => address) public bidsToUsersMapping;

    /*This map keeps tracks of users who have paid recently
      Stores the address mapped to bidAmount
     */
    mapping (address => uint) paidUsers;
    
    event MessageEvent(string msg, uint value);

    string public greeting = "Welcome to Lowest Bidding Game. Call bidPrice to view price for each bid and Call placeBid after you purchase bidding capabiility by sending funds";
    
    uint public bidPrice;
    
    address public owner;
    uint public timeEnd;
    
    function BiddingAgency(uint _bidPrice, uint _duration){
	bidPrice = _bidPrice;
	owner = msg.sender;

	timeEnd = now + _duration * 1 minutes;
    }


    /*This function allows the user to bet by sending his lowest bid guess. He can place as many bids as he wishes until his balance is finished*/
    function placeBid(uint bidValue){

	/*Bids can only be placed if they are before the deadline*/
	if(now < timeEnd)
	{
	    /*Check if the user has paid us enough to place a bid*/
	    if(paidUsers[msg.sender] >= bidPrice){

		/*Decrease the users balance by the price of one bid*/
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
		    /*Update the bidValue to bidder mapping Now bidValue belongs to msg.sender*/
		    
		    bidsToUsersMapping[bidValue] = msg.sender;		
		    MessageEvent("Bid added", bidValue);
		}
		
	    }else{
		MessageEvent("Insufficient funds. Please send more ethers and try again", 0);
	    }
	}
    }

    /*This function gets called when a user pays the agency using eth.sendTransaction*/
    function () {
	/*Accumulate the payment in paidUsers*/
	paidUsers[msg.sender] = paidUsers[msg.sender] + msg.value;
	
	MessageEvent("Funds received", msg.value);	
    }
}
