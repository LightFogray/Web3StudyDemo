const fs = require('fs-extra');
const solc = require('solc');
const path = require('path');

let compilePath = path.resolve(__dirname, '../compiled');
fs.removeSync(compilePath);
fs.ensureDirSync(compilePath)

const contractPath = path.resolve(__dirname, '../contracts','Storage.sol');
const contractSrc = fs.readFileSync(contractPath, 'utf-8');
let compileRes = solc.compile(contractSrc,1);

console.log(compileRes)

//完善报错信息
if (Array.isArray(compileRes.errors) && compileRes.errors.length) {
	throw new Error(compileRes.errors[0]);
}

//将合约的json对象输出为文件
Object.keys(compileRes.contracts).forEach(name => {
	let contractName = name.replace(/^:/,'');
	let filePath = path.resolve(compilePath,`${contractName}.json`)
	fs.outputJsonSync(filePath,compileRes.contracts[name]);
	console.log('Saving json file to ' + filePath)
})