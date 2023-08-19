// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Hero {
    enum Class { Mage, Healer, Barbarian }

    mapping(address => uint[]) addressToHeroes;

    function getHeroes() public view returns (uint[] memory) {

    }
    
    function createHero(Class) public payable {
        require(msg.value >= 0.05 ether, "Insufficient funds: Please send required payment");
    }
}