import React, {Component} from "react";
import Table from "../table";
import {Redirect} from "react-router-dom";
import axios from 'axios';

export default class Game extends Component {
    state = {
        field: [],
        player: 1,
        game: true,
        loaded: false
    };

    componentDidMount() {
        this.resetField();
        this.updateField();
        setInterval(this.updateField, 1000);
    }

    updateField = () => {
        axios.get('http://localhost:5000/field').then((response) => {
            this.setState({
                field: response.data,
                loaded: true
            });
        });
    };

    clickColumn = i => {
        if (this.state.game) {
            axios.post('http://localhost:5000/move', {column: i, player: this.state.player}).then((response) => {
                this.setState({
                    field: response.data.field,
                    player: response.data.player,
                    game: response.data.game
                });
            });
        }
    };

    resetField = () => {
        axios.get('http://localhost:5000/clear').then((response) => {
            this.setState({
                field: response.data,
                loaded: true,
                player: 1,
                game: true
            });
        });
    };

    render() {
        if (
            !this.props.location.state ||
            !this.props.location.state.fromStartScreen
        ) {
            return <Redirect to="/"/>;
        }
        return (
            this.state.loaded ?
                <Table
                    game={this.state.game}
                    field={this.state.field}
                    player={this.state.player}
                    playersName={[this.props.location.state.playerOne, this.props.location.state.playerTwo]}
                    onClickColumn={this.clickColumn}
                    resetField={this.resetField}
                /> :
                <p>Loading</p>
        );
    }
}
