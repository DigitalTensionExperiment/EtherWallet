/**
 * Created by zwilhelm on 9/24/17.
 */
contract('EtherWallet', function(accounts) {

    // check if sender is allowed or not
    it('the owner is allowed to send funds', function () {
        // Get a contract
        var myContract = EtherWallet.deployed();
        // account[0] should be the account who deployed the contract
        return myContract.isAllowedToSend.call(accounts[0]).then(function(isAllowed) {
            assert.equal(isAllowed, true, 'the owner should have been allowed to send funds');
        })
        // isAllowedToSend() is the SimpleWallet function being called and tested here
    });

    // it('the other account should not be allowed to send funds', function () {
    //     var myContract = SimpleWallet.deployed();
    //     return myContract.isAllowedToSend.call(accounts[1]).then(function(isAllowed) {
    //         assert.equal(isAllowed, false, 'the owner should have been allowed to send funds');
    //     })
    // });
    //
    // it('adding accounts to the allowed list', function () {
    //     var myContract = SimpleWallet.deployed();
    //     return myContract.isAllowedToSend.call(accounts[1]).then(function(isAllowed) {
    //         assert.equal(isAllowed, false, 'the owner should have been allowed to send funds');
    //     })
    // });
    //
    // it('should check Deposit Events', function (done) {
    //     var myContract = SimpleWallet.deployed();
    //     var event = meta.allEvents();
    //
    //     event.watch(function (error, result) {
    //         if (error) {
    //             console.err(error)
    //         } else {
    //             assert.equal(result.event, "Deposit");
    //             assert.equal(web3.fromWei( result.args.amount.valueOf(), "ether" ), 1);
    //             assert.equal(result.args._sender.valueOf(), web3.eth.accounts[0]);
    //             event.stopWatching();
    //             done();
    //         }
    //     });
    //
    //     // Send ether:
    //     web3.eth.sendTransaction({from: web3.eth.accounts[0] , to: meta.address , value: web3.toWei()});
    //
    // });



});

















