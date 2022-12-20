// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Patentic {
    uint256 totalPatents;
    uint256 totalMessages;
    address public owner;

    struct PatentContent {
        string patentName;
        string patentText;
        string patentType;
    }

    struct Patent {
        address patentOwner;
        PatentContent patentData;
        uint256 timestamp;
    }

    struct Message {
        address to;
        address from;
        uint256 timestamp;
        string text;
        string patent;
    }
    

    /**
     * Events
     */

    event NewPatent(address indexed from, uint256 timestamp, PatentContent PatentData);
  
    event NewMessage(address indexed from, address indexed to, uint256 timestamp, string text, string patent);
    
    mapping(address => Patent[]) patentsByAddress;

    mapping(address => Message[]) addressMessages;
    

    Patent[] patents;


    constructor() {
        owner = msg.sender;
        console.log("We have been constructed!");
    }



    /*
     * created a new patent with data sent fromthr client
     */
    function createPatent(string memory _patentName, string memory _patentText, string memory _patentType) public {
        totalPatents += 1;
        patentsByAddress[msg.sender].push(Patent(msg.sender, PatentContent(_patentName, _patentText, _patentType), block.timestamp));
        patents.push(Patent(msg.sender, PatentContent(_patentName, _patentText, _patentType), block.timestamp));

        emit NewPatent(msg.sender, block.timestamp, PatentContent(_patentName, _patentText, _patentType));
    }


    /**
     * Get patents of address on the blockchain
     */
     function getPatentsOnAddress() public view returns (Patent[] memory) {
    
        return patentsByAddress[msg.sender];
     }

    //  function getPatentById(address _address, string memory timestamp) public view returns (Patent memory) {
    //     return patentsByAddress[msg.sender][]
    //  }

     /**
     * Retrieve all patents with address on the blockchain
     */
    function getAllPatents() public view returns (Patent[] memory) {
   
        return patents;
    }

    /**
     * Get number of patents on the blockchain
     */
    function getTotalPatents() public view returns (uint256) {
        return totalPatents;
    }

    /**
     * Add Message to addresses
     */
     function addMessage (address _to, string memory _text, string memory _patent) public {
        require(_to == owner, "Cannot send message to yourself");
        addressMessages[msg.sender].push(Message(_to, msg.sender, block.timestamp, _text, _patent));
        addressMessages[_to].push(Message(_to, msg.sender, block.timestamp, _text, _patent));
        totalMessages += 1;

        emit NewMessage(msg.sender, _to, block.timestamp, _text, _patent);
     } 

     /**
      * Get address messages from blockchain
      */
    function getMessagesOnAddress() public view returns (Message[] memory) {
        return addressMessages[msg.sender];
    }

    function getTotalMessages() public view returns (uint256) {
        return totalMessages;
    }

}

// npx browserslist@latest --update-db
