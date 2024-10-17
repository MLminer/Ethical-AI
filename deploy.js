const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("https://"));

const fs = require("fs");
const solc = require("solc");

const source = fs.readFileSync("VoteContract.sol", "utf8");
const compiledContract = solc.compile(source, 1).contracts[":VoteContract"];
const abi = JSON.parse(compiledContract.interface);
const bytecode = compiledContract.bytecode;

const deploy = async () => {
  const accounts = await web3.eth.getAccount();
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to:", result.options.address);
};

deploy();
