//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteContract {
    struct Vote {
        address voter;
        string guidelined;
        bool vote;
    }

    Vote[] public votes;
    mapping(address => bool) public hasVoted;

    event VoteRecorded(address indexed voter, string guidelineId, bool vote);

    function recordVote(string memory guidelineId, bool vote) public {
        require(!hasVoted[msg.sender], "Voter has already voted");
        votes.push(Vote(msg.sender, guidelineId, vote));
        hasVoted[msg.sender] = true;
        emit VoteRecorded(msg.sender, guidelineId, vote);
    }

    function getVotes() public view returns (Vote[] memory) {
        return votes;
    }
}