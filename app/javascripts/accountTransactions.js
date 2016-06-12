function invite(){
  var mountain = Mountain.at(window.location.hash.slice(1));
  setStatus("Processing...");
  var accountToInvite = document.getElementById("address").value;

  mountain.invite(accountToInvite, {from: account}).then(function(value){
    setStatus("User invited.");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error inviting user; see log.");
  });
}

function join(){
  var mountain = Mountain.at(window.location.hash.slice(1));
  setStatus("Processing...");
  var Factory = MountainFactory.deployed();

  mountain.contractName.call({from: account}).then(function(value){
    if(value){
      Factory.joinMountain(web3.toAscii(value), mountain.address, {from: account}).then(function(value){
        setStatus("You have joined this mountain.");
      }).catch(function(e) {
        console.log(e);
        setStatus("Error joining mountain; see log.");
      });
    }
  });


}
