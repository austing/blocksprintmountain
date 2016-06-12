$(document).ready(function(){
  $('input#multiplier').change(function(e){
    console.log(e)
    $('span.multiplier').text(e.target.value);
  })
});

$(document).ready(function(){
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
  var maxLoan = parseInt(document.getElementById("maxLoan").value);

  setStatus("Creating mountain...");

  Factory.createContract(name, multiplier, waitingWeeks, maxLoan, {from: account}).then(function() {
    setStatus("");
    $('#createForm').hide();
    $('.success').css('display','');
    refreshMyMountains();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error creating mountain; see log.");
  });

};
