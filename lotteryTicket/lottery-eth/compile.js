let solc = require('solc')
let fs = require('fs')

//.sol合约
let source =  fs.readFileSync('./contracts/Lottery.sol', 'utf-8')
// let source =  fs.readFileSync('./contracts/Lottery.sol', 'utf-8')
//   console.log('source :', source)

let output = solc.compile(source, 1)
// console.log('output :', output)

module.exports = output['contracts'][':Lottery']
module.exports = output.contracts[':Lottery']




