function setMembersList(listHTML) {
  var myMountains = document.getElementById("membersTable");
  myMountains.innerHTML = listHTML;
};

function showMountainDetail(){
  var mountain = Mountain.at(window.location.hash.slice(1));

  mountain.contractName.call({from: account}).then(function(value){
    if(value){
      $('.mountainName').text(web3.toAscii(value));
    }
  });

  $('.mountainBalance').text(web3.eth.getBalance(mountain.address));

  mountain.memberInformationLength.call({from: account}).then(function(value) {

    var length = value.c[0];
    var members = [];
    _.each(_.range(length),
      function(i){
        mountain.memberInformation.call(i, {from: account}).then(function(value) {
          var member = {};
          member.address = value[0];
          member.lastTransaction = value[1];
          member.lastTransactionDate = new Date(value[2]*1000);
          member.totalOut = value[3];
          if(member.totalOut > 0){
            member.signForOut = '+';
          }else{
            member.signForOut = '';
          }
          member.totalIn = value[4];
          if(member.totalIn > 0){
            member.signForIn = '+';
          }else{
            member.signForIn = '';
          }
          member.balance = value[5];
          member.name = web3.toAscii(value[6]);

          images = [
            "/static/images/laurie.jpg",
            "/static/images/bertram.jpg",
            "/static/images/richard.jpg",
            "/static/images/jared.jpg",
            "/static/images/erlich.jpg",
          ];
          member.image = images[i%5];

          members.push(member);

          if(i+1 == length){

            setMembersList(
              _.map(members, function(member){
                return `
                <tr>
                    <td><img src="`+member.image+`" width="100" alt=""></td>
                    <td>`+member.name+`</td>
                    <td>`+String(member.lastTransaction)+`</td>
                    <td>`+member.signForIn+String(member.totalIn)+`€</td>
                    <td>`+member.signForOut+String(member.totalOut)+`€</td>
                    <td>`+String(member.balance)+`€</td>
                </tr>`;
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
    setFoundedMountains("Error getting mountains; see log.");
  });
}
