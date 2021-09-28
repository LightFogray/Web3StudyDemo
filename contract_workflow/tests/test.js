const assert = require("assert");
const path = require("path");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const contractPath = path.resolve(__dirname,'../compiled/Storage.json');
const {interface, bytecode} = require(contractPath);

let contract;
let accounts;

web3.eth.getAccounts()

describe('#contract', ()=>{
	before(()=>{
		console.log('test starting...')
	})
	after(()=>{
		console.log('test ending...')
	})
	beforeEach(async ()=>{
		accounts = await web3.eth.getAccounts();
		contract = await new web3.eth.Contract(JSON.parse(interface))
							.deploy({data: bytecode})
							.send({from:accounts[0],gas:2000000});
	})
	it('contract deploy successfully', ()=> {
		assert.ok(contract.options.address)
	})
	it('should set a param to store', async()=>{
		const x = 66060;
		await contract.methods.store(x).send({
			from:accounts[0]
		});
		const param = await contract.methods.retrieve().call();
		assert.equal(param, x);
	})
	
})