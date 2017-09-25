pragma solidity ^0.4.0;


contract EtherWallet {

    address owner;

    struct WithdrawalStruct {
        address to;
        uint amount;
    }

    struct Senders {
        bool allowed;
        uint amount_sends;
        mapping(uint => WithdrawalStruct) withdrawals;
    }

    // mapping determines if [someone] is allowed to send funds
    mapping(address => bool) isAllowedToSendFundsMapping;

    event Deposit(address _sender, uint account);
    event Withdrawal(address _sender, uint amount, address _beneficiary);

    // CONSTRUCTOR:
    // owner is assigned to msg.sender so we know who created this contract;
    // the sender object is the one who created this wallet;
    function EtherWallet(){
        owner = msg.sender;
    }

    // ANONYMOUS func.: called when receiving funds or no funds & without function
    // - receives funds
    // - throw error is from_account is not allowed
    function() {
        // if it's the owner, or if the boolean value in the mapping is true
        //if(msg.sender == owner || isAllowedToSendFundsMapping[msg.sender] == true) {
        if(isAllowedToSend(msg.sender)) {
            // Emit an event: Deposit
            Deposit(msg.sender, msg.value);
        } else {
            //throw;
            revert();
        }
    }

    // sendFunds()
    // - only allowed people
    function sendFunds(uint amount, address receiver) returns (uint) {
        // if it's the owner, or if the boolean value in the mapping is true
        //if(msg.sender == owner || isAllowedToSendFundsMapping[msg.sender]) {
        if(isAllowedToSend(msg.sender)) {
            // then check if there's enough balance
            if(this.balance >= amount) {
                // then send the amount to the receiver
                if(!receiver.send(amount)) {
                    // or throw an exception
                    //throw;
                    revert();
                }
                // then make sure everything is rolled back
                // emit an event
                Withdrawal(msg.sender, amount, receiver);
                // and then return new balance
                isAllowedToSendFundsMapping[msg.sender].amount_sends++;
                isAllowedToSendFundsMapping[msg.sender].withdrawals[isAllowedToSendFundsMapping[msg.sender].amount_sends].to = receiver;
                isAllowedToSendFundsMapping[msg.sender].withdrawals[isAllowedToSendFundsMapping[msg.sender].amount_sends].amount = amount;
                return this.balance;
            }
        }
    }

    // allowAddressToSend(): allow new addresses to send funds
    // ".allowed" lets this function access the struct (rather than simple bool value)
    function allowAddressToSendMoney(address _address) {
        if(msg.sender == owner) {
            // set them in the mapping as true
            isAllowedToSendFundsMapping[_address].allowed = true;
        }
    }

    // disallowAddressToSend()
    // ".allowed" lets this function access the struct (rather than simple bool value)
    function disallowAddressToSendMoney(address _address) {
        if(msg.sender == owner) {
            isAllowedToSendFundsMapping[_address].allowed = false;
        }
    }

    // isAllowedToSend()
    // ".allowed" lets this function access the struct (rather than simple bool value)
    function isAllowedToSend(address _address) constant returns (bool) {
        return isAllowedToSendFundsMapping[_address].allowed || msg.sender == owner;
    }

    // killWallet()
    function killWallet() {
        if(msg.sender == owner) {
            suicide(owner);
        }
    }


}
