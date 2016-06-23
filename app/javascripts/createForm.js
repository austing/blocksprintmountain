$(document).ready(function(){
  $('input#multiplier').change(function(e){
    console.log(e)
    $('span.multiplier').text(e.target.value);
  })
});

$(document).ready(function(){
  $(':input:enabled:visible:first').focus();

  $('input#waitingWeeks').change(function(e){
    console.log(e)
    $('span.waitingWeeks').text(e.target.value);
  })
});

function createContract() {
  var Factory = MountainFactory.deployed();

  var name = document.getElementById("name").value;
  var multiplier = parseInt(document.getElementById("multiplier").value);
  var waitingWeeks = parseInt(document.getElementById("waitingWeeks").value);
  var maxLoan = parseInt(document.getElementById("maxLoan").value) || 0;

  if(!name){return;}

  setStatus("Creating mountain...");
  var events = Factory.MountainCreated({fromBlock: web3.eth.blockNumber, toBlock: 'latest'});
  events.watch(function(error, result){
    if(result){
      $('#toMountain').attr('href', '/mountain.html#'+result.args.mountain)
      events.stopWatching();
    }else{
      console.log('ERROR', error)
    }
  });

  Factory.createContract(name, multiplier, waitingWeeks, maxLoan, {from: account}).then(function(value) {
    setStatus("");
    $('#createForm').hide();
    $('.success').css('display','');
    // web3.eth.getTransactionReceipt(value)
  }).catch(function(e) {
    console.log(e);
    setStatus("Error creating mountain; see log.");
  });

};
