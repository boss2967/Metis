import React from 'react'
import {Button, Card, Icon, Image, Statistic} from 'semantic-ui-react'

const CardExampleCard = (props) => (
    <Card>
        <Image src='images/logo.png'/>
        <Card.Content>
            <Card.Header>黑马go一期福利彩票</Card.Header>
            <Card.Meta>
                <p>管理员地址: {props.manager}</p>
                <p>当前地址: {props.currentAccount}</p>
            </Card.Meta>
            <Card.Description>今天下午就开奖！</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <a>
                <Icon name='user'/>
                {props.playersCount}人参与
            </a>
            <p>上一期中奖者：{props.winner}</p>
        </Card.Content>
        <Card.Content extra>
            <Statistic color='red'>
                <Statistic.Label>奖金池</Statistic.Label>
                <Statistic.Value>{props.balance}ETH</Statistic.Value>
            </Statistic>
        </Card.Content>
        <Card.Content extra>
            <Statistic color='blue'>
                <Statistic.Value>第{props.round}期</Statistic.Value>
                <Statistic.Label>
                    <a href='https://ropsten.etherscan.io/address/0x143066ab1c9432fb8cf61b48603e74e8b13ee52b'>
                        点击我查看交易历史
                    </a>
                </Statistic.Label>
            </Statistic>
        </Card.Content>
        <Button animated='fade' color='green' onClick={props.play} loading={props.isPlaying}
                disabled={props.isDisable()}>
            <Button.Content visible>投注产生希望</Button.Content>
            <Button.Content hidden>购买放飞梦想</Button.Content>
        </Button>
        <Button inverted color='red' style={{display: props.buttonControl}} onClick={props.kaijiang}
                loading={props.isKaiJiangZhong} disabled={props.isDisable()}>
            开奖
        </Button>
        <Button inverted color='orange' style={{display: props.buttonControl}} onClick={props.tuijiang}
                loading={props.isTuiJiangZhong} disabled={props.isDisable()}>
            退奖
        </Button>
    </Card>
)

export default CardExampleCard
