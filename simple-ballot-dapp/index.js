var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var abiStr = '[{"constant":true,"inputs":[{"name":"candidateName","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidateName","type":"bytes32"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"voteReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateListName","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]'
var abi = JSON.parse(abiStr);
var contractAddr = "0x05b14221de515c3bb09982a121c2bc37ce885aa3";
var contractInstance = new web3.eth.Contract(abi, contractAddr);

var candidates = {"Alice":"candidate-1","Bob":"candidate-2","Cary":"candidate-3"};

$(document).ready(function(){
  loadVotes();
})

function loadVotes(){
  var candidateList = Object.keys(candidates);
  for (let i = 0; i < candidateList.length; i++) {
    let name = candidateList[i];
    let res = contractInstance.methods.totalVotesFor(web3.utils.toHex(name)).call()
    .then(res=>{
      $('#' + candidates[name]).html(res.toString());
    });
    // web3.eth.getAccounts(console.log)
  }
}

async function voteForCandidate() {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0])
  var input = $('#candidate').val();
  console.log($('#candidate').val())
  try {
    contractInstance.methods.vote(web3.utils.toHex(input)).send({from:accounts[0]})
    .then(res=>{
      console.log(res);
      loadVotes();
    });
  }catch(err) {
    console.log(err)
  }
}