import React, {Component} from "react";
import Table from "../table";
import {Redirect} from "react-router-dom";

class Game extends Component {
    state = {
        field: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ],
        player: 1,
        game: true
    };

    clickColumn = i => {
        if (this.state.game) {
            const newField = [...this.state.field];
            if (newField[i].lastIndexOf(0) >= 0) {
                const horizontal = [];
                const mainDiagonal = [];
                const sideDiagonal = [];
                newField[i][newField[i].lastIndexOf(0)] = this.state.player;
                newField.forEach(field => {
                    horizontal.push(field[newField[i].lastIndexOf(0) + 1]);
                });

                for (
                    let x = 0, y = newField[i].lastIndexOf(0) + 1 + i;
                    y >= 0;
                    x++, y--
                ) {
                    if (newField[x] !== undefined && newField[x][y] !== undefined) {
                        mainDiagonal.push(newField[x][y]);
                    }
                }

                for (
                    let x = 0, y = newField[i].lastIndexOf(0) + 1 - i;
                    x < newField.length && y <= newField[i].length;
                    x++, y++
                ) {
                    if (newField[x][y] !== undefined) {
                        sideDiagonal.push(newField[x][y]);
                    }
                }

                this.setState({field: newField});
                if (
                    this.checkGame(newField[i]) ||
                    this.checkGame(horizontal) ||
                    this.checkGame(sideDiagonal) ||
                    this.checkGame(mainDiagonal)
                ) {
                    this.setState({game: false});
                } else {
                    this.setState({
                        player: this.state.game && this.state.player === 1 ? 2 : 1
                    });
                }
            }
        }
    };

    checkGame(field) {
        if (this.state.game) {
            let count = 0;
            let maxCount = 0;
            field.forEach(cell => {
                if (cell === this.state.player) {
                    count++;
                    maxCount = maxCount < count ? count : maxCount;
                } else {
                    count = 0;
                }
            });
            return maxCount === 4;
        }
    }

    resetField = () => {
        this.setState({
            field: [...this.state.field].map(_ => [0, 0, 0, 0, 0, 0]),
            player: 1,
            game: true
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
            <>
                <Table
                    game={this.state.game}
                    field={this.state.field}
                    player={this.state.player}
                    playersName={[this.props.location.state.playerOne, this.props.location.state.playerTwo]}
                    onClickColumn={this.clickColumn}
                    resetField={this.resetField}
                />
            </>
        );
    }
}

export default Game;
