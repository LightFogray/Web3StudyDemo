const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const fs = require('fs-extra');
const path = require('path');

const filePath = path.resolve(__dirname,'../compiled/Storage.json');
const {interface, bytecode} = require(filePath);

(async function(){
	let accounts = await web3.eth.getAccounts();
	let res = await new web3.eth.Contract(JSON.parse(interface))
							.deploy({data: bytecode})
							.send({from:accounts[0],gas:2000000});
	
	console.log("result: " + res.options.address)
})()