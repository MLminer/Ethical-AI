const path = require('path');
const fs = require('fs');
const solc = require('solc');

// Path to the Solidity file
const contractPath = path.resolve(__dirname, 'VoteContract.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// Compile the contract
const input = {
    language: 'Solidity',
    sources: {
        'VoteContract.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts['VoteContract.sol']['VoteContract'];

// Save ABI and bytecode to a JSON file
const contractData = {
    abi: contract.abi,
    bytecode: contract.evm.bytecode.object,
};

fs.writeFileSync(path.resolve(__dirname, 'VoteContract.json'), JSON.stringify(contractData, null, 2));

console.log('ABI and bytecode saved to VoteContract.json');
