const {Web3, providers} = require("web3");
const Vote = require("../models/Vote");
const web3 = new Web3(new providers.http.default("http://localhost:8545"));