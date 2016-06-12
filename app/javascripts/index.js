function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function setFoundedMountains(message) {
  var myMountains = document.getElementById("myFoundedMountains");
  myMountains.innerHTML = message + `
  <div class="block-pot block-pot-create w33">
    <a href="/create-mountain.html">
      <h3><span>+</span> Create mountain</h3>
    </a>
  </div>
  `;
};

function setJoinedMountains(message) {
  var myMountains = document.getElementById("myJoinedMountains");
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
                return `
                <div class="block-pot w33">
                  <a href="/mountain.html#`+item[1]+`">
                    <h3>`+name+`</h3>
                  </a>
                </div>
                `;
              }).join(`
                `)
            );

          }
        }).catch(function(e) {
          console.log(e);
          setFoundedMountains("Error getting mountains; see log.");
        });
      }
    );

  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting number of mountains; see log.");
  });

  Factory.contractsByMemberLength.call(account, {from: account}).then(function(value){

    var mountains = [];
    if(!value.c[0]){
      setJoinedMountains("No current mountains set up.")
      return;
    }
    var length = value.c[0];
    _.each(_.range(length),
      function(i){
        Factory.contractsByMember.call(account, i, {from: account}).then(function(value) {
          mountains.push(value);

          if(i+1 == length){

            setJoinedMountains(
              _.map(mountains, function(item){
                var name = web3.toAscii(item[0]);
                return `
                <div class="block-pot w33">
                  <a href="/mountain.html#`+item[1]+`">
                    <h3>`+name+`</h3>
                  </a>
                </div>
                `;
              }).join(`
                `)
            );

          }
        }).catch(function(e) {
          console.log(e);
          setJoinedMountains("Error getting mountains; see log.");
        });
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

  setStatus("Creating mountain...");

  Factory.createContract(name, multiplier, waitingWeeks, maxLoan, {from: account}).then(function() {
    setStatus("Mountain created");
    refreshMyMountains();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error creating mountain; see log.");
  });

};
