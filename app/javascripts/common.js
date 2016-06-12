var accounts;
var account;
var balance;

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    console.log(accs)
    accounts = accs;
    account = accounts[3];//accs.length - 1];
    console.log(account)

    if(window.page == 'index'){
      refreshMyMountains();
    }
    if(window.page == 'mountain-detail'){
      showMountainDetail();
    }
    if(window.page == 'deposit'){
      showTransactionForm();
    }
    if(window.page == 'borrow'){
      showTransactionForm();
      showBorrowMessage();
    }
    if(window.page == 'withdraw'){
      showTransactionForm();
      showWithdrawMessage();
    }
    if(window.page == 'payment'){
      showTransactionForm();
      showPaymentMessage();
    }
    if(window.page == 'join'){
      showTransactionForm();
    }
  });
}

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};


function showTransactionForm(){
  var hash = window.location.hash.slice(1);
  var mountain = Mountain.at(hash);

  $('#toMountain').attr('href', '/mountain.html#'+hash);

  mountain.contractName.call({from: account}).then(function(value){
    if(value){
      $('.mountainName').text(web3.toAscii(value));
    }
  });
}
