import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import './start.scss'

export default class StartScreen extends Component {
    state = {
        playerOne: 'Первый',
        playerTwo: 'Второй',
        to: false
    };

    check = () => {
        this.setState({to: 'game'})
    };

    changeName = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        if (this.state.to) {
            return <Redirect to={{
                pathname: '/game',
                state: {
                    fromStartScreen: true,
                    playerOne: this.state.playerOne,
                    playerTwo: this.state.playerTwo
                }
            }}/>
        }

        return (
            <div className='start'>
                <form>
                    <label>Имя первого игрока
                        <input type="text" onChange={this.changeName} name="playerOne" value={this.state.playerOne}
                               required/>
                    </label>
                    <label>Имя второго игрока
                        <input type="text" onChange={this.changeName} name="playerTwo" value={this.state.playerTwo}
                               required/>
                    </label>
                    <button className='btn' type="button" onClick={this.check}>Начать</button>
                </form>
            </div>
        )
    }
}