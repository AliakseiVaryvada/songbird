import React, {Component} from 'react';

import './item.css';
export default class Item extends Component{
        // state = {
        //     selected : false
        // }

    render() {

        const {id, secretId, name, onItemSelected, selected, disableElement} = this.props

        let className = selected === true ?
            (secretId === id ? 'list-group-item success' : 'list-group-item error')
            : 'list-group-item'

        disableElement === true ? className += ' disabled-item-list' : className += ''

        return(
            <li className={className}
                key={id}
                id = {id}
                onClick={(event) => onItemSelected(event)}>
                <span className="li-btn"></span>
                {name}
            </li>
        )
    }
}