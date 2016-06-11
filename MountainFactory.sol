import "Mountain.sol";

contract MountainFactory {

    struct MountainContract {
        bytes32  contractName;
        address contractAddress;
    }

    mapping(address => MountainContract[]) public contractsByFounder;
    mapping(address => uint) public contractsByFounderLength;
    mapping(address => MountainContract[]) public contractsByMember;
    mapping(address => uint) public contractsByFounderLength;

    function createContract (bytes32 name, uint multiplier, uint waitingWeeks, uint maxLoan) public {
        var mountain = new Mountain(name, multiplier, waitingWeeks, maxLoan, msg.sender, this);
        contractsByFounder[msg.sender].push(MountainContract(
            name,
            mountain
        ));
        contractsByFounderLength = contractsByFounder[msg.sender].length + 1;
    }

    function addContractMember (address who, string contractName, address contractAddress) public {
        contractsByMember[who].push(MountainContract(
            contractName,
            contractAddress
        ));
        contractsByMemberLength = contractsByMemberLength[msg.sender].length + 1;
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
