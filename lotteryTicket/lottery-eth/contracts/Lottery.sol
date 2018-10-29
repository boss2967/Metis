pragma solidity ^0.4.24;


contract Lottery {
    //      管理员
    address public manager;
    //      彩民集合
    address[] public players;
    address public winner;
    //      第几期
    uint256 public round;

    constructor() public payable {
        manager = msg.sender;
    }

    function play() public payable {
        //\1. 投钱
        //\2. 把这个人添加到彩民集合

        //msg.value 是通过 web3.js 的send中的value字段传进来的
        require(msg.value == 1 ether, "111111");
        players.push(msg.sender);
    }

    //开奖函数，由管理员执行
    function kaijiang() onlyManager public {
        // require(msg.sender == manager);
        // 业务逻辑：

        // 1. 随机找一个玩家，
        //   1. 玩家在数组中players，我们要找一个随机数，作为下标，找到幸运玩家
        //   2.
        // 2. 给这个人转合约内所有的钱
        // 3. 期数加1
        // 4. 彩民池清零

        require(players.length != 0, "players length is 0");
        uint256 res = uint256(sha3(block.difficulty, now, players.length));
        uint index = res % players.length;
        winner = players[index];
        winner.transfer(address(this).balance);
        round++;
        delete players;
    }

    //修饰器，限定只有管理可以进行开奖
    modifier onlyManager() {
        require(msg.sender == manager, "111111");
        _;
    }


    // 业务逻辑：

    // 1. 对所有参与人进行转账，每人1 ether
    // 2. 期数加一
    // 3. 参与池清零

    // 条件：

    // 1. 只有管理员有权限
    // 2. 必须有人参与才进行退奖（可选）

    function tuijiang() onlyManager public{
        //Require只有remix新版本才可以看自定义的第二个参数
        require(players.length != 0, 'players should not be 0');
        for (uint256 i = 0; i < players.length; i++) {
            players[i].transfer(1 ether);
        }

        round++;
        delete players;
    }

    // 1. 返回所有玩家
    function getPlayers() public view  returns(address[]) {
        return players;
    }

    // 2. 返回玩家人数
    function getPlayersCount() public view returns(uint256) {
        return players.length;
    }


    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
}
