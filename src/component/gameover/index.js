import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import './game-over.scss'

export default class GameOver extends Component {

    render() {
        if (this.props.location.state && this.props.location.state.player) {
            return (
                <div className='game-over'>
                    <p>Поздравляем победил {this.props.location.state.player}!</p>
                    <Link className="btn" to="/">В начало</Link>
                </div>
            )
        } else {
            return <Redirect to="/"/>
        }
    }
}