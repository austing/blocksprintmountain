var accounts;
var account;
var balance;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function setFoundedMountains(message) {
  var myMountains = document.getElementById("myMountains");
  myMountains.innerHTML = message;
};

function refreshMyMountains() {
  var Factory = MountainFactory.deployed();

  Factory.contractsByFounderLength.call(account, {from: account}).then(function(value){

    var mountains = [];
    if(!value.c[0]){
      setFoundedMountains("No current mountains set up.")
      return;
    }
    var length = value.c[0];
    _.each(_.range(length),
      function(i){
        Factory.contractsByFounder.call(account, i, {from: account}).then(function(value) {
          mountains.push(value);

          if(i+1 == length){

            setFoundedMountains(
              _.map(mountains, function(item){
                var name = web3.toAscii(item[0]);
                return '<a href="'+item[1]+'">'+name+'</a>';
              }).join(', ')
            );

          }
        }).catch(function(e) {
          console.log(e);
          setFoundedMountains("Error getting mountains; see log.");
        });;
      }
    );



  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting number of mountains; see log.");
  });
};

function createContract() {
  var Factory = MountainFactory.deployed();

  var name = document.getElementById("name").value;
  var multiplier = parseInt(document.getElementById("multiplier").value);
  var waitingWeeks = parseInt(document.getElementById("waitingWeeks").value);
  var maxLoan = parseInt(document.getElementById("maxLoan").value);

  setStatus("Initiating transaction... (please wait)");

  Factory.createContract(name, multiplier, waitingWeeks, maxLoan, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshMyMountains();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });

};

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

    accounts = accs;
    account = accounts[0];

    refreshMyMountains();
  });
}
