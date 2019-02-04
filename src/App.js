import React, {Component} from 'react';
import Game from './component/game'
import GameOver from './component/gameover'
import Start from './component/start'
import {HashRouter, Route} from 'react-router-dom'
import './app.scss'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <>
                    <Route path="/" exact component={Start}></Route>
                    <Route path="/game" component={Game}></Route>
                    <Route path="/gameover" component={GameOver}></Route>
                </>
            </HashRouter>
        )
    }
}

export default App;
