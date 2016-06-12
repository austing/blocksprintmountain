import 'Mountain.sol';

contract MountainFactory {

    struct MountainContract {
        bytes32  contractName;
        address contractAddress;
    }

    mapping(address => MountainContract[]) public contractsByFounder;
    mapping(address => uint) public contractsByFounderLength;
    mapping(address => MountainContract[]) public contractsByMember;
    mapping(address => uint) public contractsByMemberLength;

    function createContract (bytes32 contractName, uint multiplier, uint waitingWeeks, uint maxLoan) public returns (address) {
        var mountain = new Mountain(contractName, multiplier, waitingWeeks, maxLoan, msg.sender);
        contractsByFounder[msg.sender].push(MountainContract(
            contractName,
            mountain
        ));
        contractsByFounderLength[msg.sender] = contractsByFounderLength[msg.sender] + 1;
        mountain.addMember(msg.sender, 'Founder');
        addContractMember(msg.sender, 'Founder', mountain);
        return mountain;
    }

    function addContractMember (address who, bytes32 contractName, address contractAddress) public {
        contractsByMember[who].push(MountainContract(
            contractName,
            contractAddress
        ));
        contractsByMemberLength[msg.sender] = contractsByMemberLength[msg.sender] + 1;
    }

    function joinMountain(bytes32 name, Mountain mountain) public {
        // Member who has been invited accepts invitation and
        // Becomes a member
        if(mountain.isMemberInvited(msg.sender) == true){
            mountain.addMember(msg.sender, name);
            addContractMember(msg.sender, name, mountain);
        }
    }

    // READ METHODS for "calls"
    /*  Unneccessary and impossible
    function contractsForSet (MountainContract[] set) internal returns (string){
        var response = '[';
        for (uint j = 0; j < set.length; j++) {
            var c = set[j];
            if(c.contractAddress != 0){
                response += '{name: ' + byte(c.contractName) + ', address:' + byte(c.contractAddress) + '},';
            }
        }
        response += ']';
        return response;
    }

    function contractsForFounder (address who) constant returns (string) {
        return contractsForSet(contractsByFounder[who]);
    }

    function contractsForMember (address who) constant returns (string) {
        return contractsForSet(contractsByMember[who]);
    }
    */

}
