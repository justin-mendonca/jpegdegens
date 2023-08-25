// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract Hero {
    enum Class { Mage, Healer, Barbarian }

    mapping(address => uint[]) addressToHeroes;

    function generateRandom() public virtual view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp)));
    }

    function getHeroes() public view returns (uint[] memory) {
        return addressToHeroes[msg.sender];
    }

    function getStrength(uint hero) public pure returns (uint32) {
        return uint32((hero >> 2) & 0x1F);
    }

    function getHealth(uint hero) public pure returns (uint32) {
        return uint32((hero >> 7) & 0x1F);
    }

    function getDex(uint hero) public pure returns (uint32) {
        return uint32((hero >> 12) & 0x1F);
    }

    function getIntellect(uint hero) public pure returns (uint32) {
        return uint32((hero >> 17) & 0x1F);
    }

    function getMagic(uint hero) public pure returns (uint32) {
        return uint32((hero >> 22) & 0x1F);
    }

    function createHero(Class heroClass) public payable {
        require(msg.value >= 0.05 ether, "Insufficient funds: Please send required payment");
    
        uint[] memory stats = new uint[](5);

        stats[0] = 2;
        stats[1] = 7;
        stats[2] = 12;
        stats[3] = 17;
        stats[4] = 22;

        uint len = 5;

        uint hero = uint(heroClass);

        while (len > 0) {
            uint position = generateRandom() % len;

            // generate random value between 0 and 18
            uint value = generateRandom() % (13 + len) + 1;

            hero |= value << stats[position];

            // decrement length to avoid choosing same stat again
            len--;

            stats[position] = stats[len];
        }

        addressToHeroes[msg.sender].push(hero);
    }
}