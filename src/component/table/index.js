import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Column from '../column'
import './table.scss'

export default class Table extends Component {
    renderColumn = (el, index) => {
        return <Column data={el} key={index} index={index} onClickColumn={this.props.onClickColumn}/>
    };

    renderPanel = () => {
        return (
            <p className='game'>
                Ходит {this.props.playersName[this.props.player - 1]}
            </p>
        )
    };

    render() {
        if (!this.props.game) {
            return <Redirect to={{
                pathname: 'gameover',
                state: {
                    player: this.props.playersName[this.props.player - 1]
                }
            }
            }/>
        }

        return (
            <div className="table">
                {this.renderPanel()}
                <div className='field'>
                    {this.props.field.map(this.renderColumn)}
                </div>
                <button className="btn" onClick={() => this.props.resetField()}>Сброс</button>
            </div>
        )
    }
}
