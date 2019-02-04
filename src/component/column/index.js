import React, {Component} from 'react';
import Cell from '../cell'
import './column.scss'

class Column extends Component {

    renderColumn = (el, index) => {
        return <Cell key={index} data={el}/>
    };

    render() {
        return (
            <div className="column"
                 onClick={() => this.props.onClickColumn(this.props.index)}>
                {this.props.data.map(this.renderColumn)}
            </div>
        )
    }
}

export default Column;