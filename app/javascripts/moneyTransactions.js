function setMembersList(listHTML) {
  var myMountains = document.getElementById("membersTable");
  myMountains.innerHTML = listHTML;
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

function showBorrowMessage(){
  var mountain = Mountain.at(window.location.hash.slice(1));
  mountain.canBorrow.call({from: account}).then(function(value){
    setStatus("Can borrow up to "+String(value.c)+" ETH")
  })
}

function showWithdrawMessage(){
  var mountain = Mountain.at(window.location.hash.slice(1));
  mountain.canWithdraw.call({from: account}).then(function(value){
    setStatus("Total deposits: "+String(value.c)+" ETH")
  })
}

function showPaymentMessage(){
  var mountain = Mountain.at(window.location.hash.slice(1));
  mountain.accountBalance.call(account, {from: account}).then(function(value){
    setStatus("Current account balance: "+String(value.c)+" ETH")
  })
}

function makeDeposit(){
  var mountain = Mountain.at(window.location.hash.slice(1));
  var amount = document.getElementById("amount").value;
  setStatus("Sending money...");
  mountain.deposit({from: account, value: amount}).then(function(value){
    setStatus("Sent.");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending money; see log.");
  });

}

function withdraw(){
  var mountain = Mountain.at(window.location.hash.slice(1));
  var amount = document.getElementById("amount").value;
  setStatus("Sending money...");
  mountain.withdraw({from: account, value: amount}).then(function(value){
    setStatus("Withdrawn.");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error withdrawing money; see log.");
  });

}
