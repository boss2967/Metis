let Web3 = require('web3')

let web3

// web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'))

//如果当前的页面没有web3，那么尝试连接本地web3服务
if (typeof window.web3 === 'undefined') {
    console.log('local web3 found!')
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
} else {
    //如果当前的页面有web3，那么就连接它，我们的应用，一定给用户用的，用户要使用自己的web3
    web3 = new Web3(window.web3.currentProvider)
}


export default web3
