const {Web3, providers} = require("web3");
const Vote = require("../models/Vote");
const web3 = new Web3(new providers.http.default("http://localhost:8545"));

const VoteContract = require("../VoteContract.json");
const contractAddress = "";
const contract = new web3.eth.Contract(VoteContract.abi, contractAddress);

// const recordVoteOnChain = async (voteData) => {

// };

exports.recordVote = async (req, res) => {
  const { guidelineId, voterId, vote } = req.body;
  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .recordVote(guidelineId, vote)
      .send({ from: accounts[0], gas: "1000000" });

    res.json({ message: "Vote recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.createVote = async (req, res) => {
  const { guidelineId, voterId, vote } = req.body;
  try {
    const newVote = new Vote({ guidelineId, voterId, vote });
    await newVote.save();
    const transactionHash = await recordVoteOnChain({
      guidelineId,
      voterId,
      vote,
    });
    res.json({ transactionHash, message: "Vote recorded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
