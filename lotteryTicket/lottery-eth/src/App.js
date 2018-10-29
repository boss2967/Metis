import React, {Component} from 'react';
import lotteryContract from './eth/contract'
import web3 from './utils/getWeb3'
import CardExampleCard from './ui/display'

class App extends Component {
    //state //类内部传递数据
    //props //函数之间传递数据
    constructor(props) {
        super(props)

        //react的内置变量
        this.state = {
            manager: '',
            currentAccount: '',
            players: [],
            winner: '',
            round: 0,
            playersCount: 0,
            balance: 0,  //单位是wei
            isPlaying : false, //标识这个play按钮的当前状态
            isKaiJiangZhong : false,
            isTuiJiangZhong : false,
            buttonControl : '',  //管理员：inline， 普通用户：none
        }


    }

    async componentDidMount() {
        let accounts = await web3.eth.getAccounts()

        let manager = await lotteryContract.methods.manager().call({from: accounts[0]})
        let players = await lotteryContract.methods.getPlayers().call({from: accounts[0]})
        let winner = await lotteryContract.methods.winner().call({from: accounts[0]})
        let round = await lotteryContract.methods.round().call({from: accounts[0]})
        let playersCount = await lotteryContract.methods.getPlayersCount().call({from: accounts[0]})
        //wei单位，要转成eth单位
        let balance = await lotteryContract.methods.getBalance().call({from: accounts[0]})

        this.setState({
            // manager : manager,
            manager, //同名的变量可以直接简写
            //getAccounts方法返回的就是当前的账户地址集合，accounts[0]是当前的调用地址
            currentAccount: accounts[0],
            players,
            winner,
            round,
            playersCount,
            balance: web3.utils.fromWei(balance, 'ether')
        })

        if (manager == accounts[0]) {
            //管理员则显示
            this.setState({buttonControl : 'inline'})
        } else {
            this.setState({buttonControl : 'none'})
        }
    }

    //web3调用合约返回的都是promise，需要异步处理
    //我们使用es6的async 和 await进行处理
    play = async () => {
        console.log('play 11111')
        //TODO

        //判断一下，如果已经点击了，但是没有处理完成，那么不允许再次调用合约的play方法
        this.setState({isPlaying : true})

        //1. 调用合约的play方法
        try {
            let accounts = await web3.eth.getAccounts()
            await lotteryContract.methods.play().send({
                from: accounts[0], //重新获取一次比较稳妥
                value: 1 * 10 ** 18 //wei
            })
            //弹框
            alert('投注成功!')
            this.setState({isPlaying : false})

            //这是为了自动刷新页面,可以不加，然后手动刷新
            window.location.reload(true)
        } catch (e) {
            this.setState({isPlaying : false})
            alert('投注失败!')
            console.log(e)
        }
    }

    kaijiang = async () => {
        console.log('开奖 2222')

        //判断一下，如果已经点击了，但是没有处理完成，那么不允许再次调用合约的play方法
        this.setState({isKaiJiangZhong : true})

        //1. 调用合约的play方法
        try {
            let accounts = await web3.eth.getAccounts()
            await lotteryContract.methods.kaijiang().send({
                from: accounts[0], //重新获取一次比较稳妥
                // value: 1 * 10 ** 18 //wei //开奖不需要转钱
            })
            //弹框
            let winner = await lotteryContract.methods.winner().call({from: accounts[0]})
            this.setState({winner})
            // alert(`本期赢家: ${this.state.winner}`)
            alert(`本期赢家: ${winner}`)
            this.setState({isKaiJiangZhong : false})

            //这是为了自动刷新页面,可以不加，然后手动刷新
            window.location.reload(true)
        } catch (e) {
            this.setState({isKaiJiangZhong : false})
            alert('开奖失败!')
            console.log(e)
        }
    }

    tuijiang = async () => {
        console.log('退奖 3333')

        //判断一下，如果已经点击了，但是没有处理完成，那么不允许再次调用合约的play方法
        this.setState({isTuiJiangZhong : true})

        //1. 调用合约的play方法
        try {
            let accounts = await web3.eth.getAccounts()
            await lotteryContract.methods.tuijiang().send({
                from: accounts[0], //重新获取一次比较稳妥
                // value: 1 * 10 ** 18 //wei
            })
            //弹框
            alert('退奖成功!')
            this.setState({isTuiJiangZhong : false})

            //这是为了自动刷新页面,可以不加，然后手动刷新
            window.location.reload(true)
        } catch (e) {
            this.setState({isTuiJiangZhong : false})
            alert('退奖失败!')
            console.log(e)
        }
    }

    //只要有一个按钮被点击了，那么三个按钮都应该被disable
    isDisable = () => {
        return this.state.isPlaying || this.state.isKaiJiangZhong || this.state.isTuiJiangZhong
    }

    render() {

        // console.log('address :', lotteryContract.options.address)


        return (
            <div className="App">
                <CardExampleCard
                    manager={this.state.manager}
                    currentAccount={this.state.currentAccount}
                    players={this.state.players}
                    winner={this.state.winner}
                    round={this.state.round}
                    playersCount={this.state.playersCount}
                    balance={this.state.balance}
                    play={this.play}
                    isPlaying={this.state.isPlaying}
                    kaijiang={this.kaijiang}
                    isKaiJiangZhong={this.state.isKaiJiangZhong}
                    tuijiang={this.tuijiang}
                    isTuiJiangZhong={this.state.isTuiJiangZhong}
                    isDisable={this.isDisable}
                    buttonControl={this.state.buttonControl}
                />
            </div>
        );
    }
}

export default App;

{/*<p>管理员地址为：{this.state.manager}</p>*/
}
{/*<p>当前账户地址：{this.state.currentAccount}</p>*/
}
{/*<p>当前玩家集合:{this.state.players}</p>*/
}
{/*<p>赢家:{this.state.winner}</p>*/
}
{/*<p>期数:{this.state.round}</p>*/
}
{/*<p>玩家人数：{this.state.playersCount}</p>*/
}
{/*<p>余额:{this.state.balance}</p>*/
}
