function showBorrowMessage(){
  var mountain = Mountain.at(window.location.hash.slice(1));

  mountain.canBorrow.call({from: account}).then(function(value){
    console.log(value);
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
  var amount = parseInt(document.getElementById("amount").value);
  setStatus("Sending money...");

  mountain.deposit({from: account, value: amount}).then(function(){
    setStatus("Sent.");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending money; see log.");
  });

}

function withdraw(){
  var mountain = Mountain.at(window.location.hash.slice(1));
  var amount = document.getElementById("amount").value;
  setStatus("Requesting withdrawal money...");
  mountain.withdraw(amount, {from: account}).then(function(value){
    setStatus("Withdrawn.");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error withdrawing money; see log.");
  });
}

function borrow(){
  var mountain = Mountain.at(window.location.hash.slice(1));
  var amount = document.getElementById("amount").value;
  setStatus("Requesting money money...");
  mountain.loan(amount, {from: account}).then(function(value){
    setStatus("Borrowed.");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error borrowing money; see log.");
  });
}
