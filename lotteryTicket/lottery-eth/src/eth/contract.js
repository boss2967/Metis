// let Web3 = require('web3')
// let web3 = new Web3()
// web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'))
import web3 from '../utils/getWeb3'
//通过web3，找到我们已经部署好的合约实例
//ABI
//合约的地址

const abi = [ { "constant": true, "inputs": [], "name": "getBalance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "winner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getPlayers", "outputs": [ { "name": "", "type": "address[]" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "round", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getPlayersCount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "manager", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "players", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "play", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "tuijiang", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": true, "stateMutability": "payable", "type": "constructor" }, { "constant": false, "inputs": [], "name": "kaijiang", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]

const contractAddress = '0xF49F767c355c6A9502Ed4c4283D474d72420b8ac'

let lotteryContract = new web3.eth.Contract(abi, contractAddress)

export default lotteryContract
