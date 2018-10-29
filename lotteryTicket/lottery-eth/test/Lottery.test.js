let assert = require('assert')
let ganache = require('ganache-cli')
//1. 第一步部署合约
let Web3 = require('web3')
let {interface, bytecode} = require('../compile')




let web3 = new Web3()

// web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'))

//临时的区块链，一般用来做单元测试，测试结束后关闭
web3.setProvider(ganache.provider())

// console.log('web3 version :', web3.version)
// console.log('web3 provider :', web3.currentProvider)

let contractInstance
let accounts

deploy = async () => {
    try {

        //获取部署账户
        accounts = await web3.eth.getAccounts()
        contractInstance = await new web3.eth.Contract(JSON.parse(interface)).deploy(
            {
                data: bytecode
                // arguments: ['']// 构造函数如果没有参数，就一定不要传
            }
        ).send({
            from: accounts[0],
            gas: '1000000'
        })

        console.log('address :', contractInstance.options.address)
    } catch (e) {
        console.log(e)
    }
}

beforeEach(async () => {
    await deploy()
})

//2. 调用合约

describe('测试Lottery合约:', () => {
    it('测试play方法:', async () => {
        try {
            await contractInstance.methods.play().send({
                from: accounts[0],
                value: 1 * 10 ** 18 //单位是wei，但是不用ether，这是solidity语法，js是没有
            })

            let count = await contractInstance.methods.getPlayersCount().call({
                from: accounts[0]
            })

            assert.equal(count, 1, "当前参与人数应该是1")

            await contractInstance.methods.tuijiang().send({
                from: accounts[0],
                // value: 1 * 10 ** 18 //单位是wei，但是不用ether，这是solidity语法，js是没有
            })

            let balance = await contractInstance.methods.getBalance().call({
                from: accounts[0]
            })

            assert.equal(balance, 0, '当前奖金池应该是0')

            let round = await contractInstance.methods.round().call({
                from: accounts[0]
            })

            assert.equal(round, 1, '当前期数应该是1')

        } catch (e) {
            console.log(e)
        }
    })

})
//3. 与目标值进行比较

//4. 我们要使用mocha库来进行测试
