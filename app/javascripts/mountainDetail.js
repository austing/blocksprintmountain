function setMembersList(listHTML) {
  var myMountains = document.getElementById("membersTable");
  myMountains.innerHTML = listHTML;
};

function setMembersList(listHTML) {
  var myMountains = document.getElementById("membersTable");
  myMountains.innerHTML = listHTML;
};

function showMountainDetail(){
  var address = window.location.hash.slice(1);
  var mountain = Mountain.at(address);
  $('a#depositLink').attr('href', "/deposit.html#"+address);
  $('a#withdrawLink').attr('href', "/withdraw.html#"+address);
  $('a#borrowLink').attr('href', "/borrow.html#"+address);

  mountain.isAddressInvited.call(account, {from: account}).then(function(value){
    console.log(arguments)
    if(value){
      $('.joinButtons').css('display', '');
      $('#joinLink').attr('href', "/join.html#"+address);
    }
  });

  mountain.canBorrow.call({from: account}).then(function(value){
    $('.maxBorrow').text(String(value.c));
  })

  mountain.isAddressMember.call(account, {from: account}).then(function(value){
    if(value == false){
      $('.membersOnly').css('display', 'none');
    }
  });

  mountain.contractName.call({from: account}).then(function(value){
    if(value){
      $('.mountainName').text(web3.toAscii(value));
    }
  });

  $('.mountainBalance').text(web3.eth.getBalance(mountain.address));

  mountain.founder.call({from: account}).then(function(value){
    if(account == value){
      $('a#inviteLink').attr('href', "/invite.html#"+address);
      $('li.adminButton').css('display', '');
    }
  }).catch(function(e){
    console.log(e)
  });

  mountain.accountBalance.call(account, {from: account}).then(function(value){
    var balance = value.c;
    if(value.s == -1){
      balance = -value.c;
    }
    $('.myMountainBalance').text(balance);
    if(value.c < 0){
      $('li.paymentButton').css('display', '');
      $('a#paybackLink').attr('href', "/pay-back.html#"+address);
    }
  }).catch(function(e){
    console.log(e)
  });

  mountain.memberInformationLength.call({from: account}).then(function(value) {

    var length = value.c[0];
    var members = [];
    _.each(_.range(length),
      function(i){
        mountain.memberInformation.call(i, {from: account}).then(function(value) {
          var member = {};
          member.address = value[0];
          member.lastTransaction = value[1];
          if(member.lastTransaction > 0){
            member.signForLast = '+';
          }else{
            member.signForLast = '';
          }
          member.lastTransactionDate = new Date(value[2]*1000);
          member.totalOut = value[3];
          member.totalIn = value[4];
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
//                    <td><img src="`+member.image+`" width="100" alt=""></td>

            setMembersList(
              _.map(members, function(member){
                return `
                <tr>
                    <td>`+member.name+`</td>
                    <td>`+member.signForLast+String(member.lastTransaction)+` ETH</td>
                    <td>`+String(member.totalIn)+` ETH</td>
                    <td>`+String(member.totalOut)+` ETH</td>
                    <td>`+String(member.balance)+` ETH</td>
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
