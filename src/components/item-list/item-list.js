import React, { Component } from 'react';

import  './item-list.css'
export default class ItemList extends Component {
    render() {
        return (
            <div className="col-md-6">
                <ul className="item-list list-group">
                    <li className="list-group-item"><span className="li-btn"></span>Ворон</li>
                </ul>
            </div>
        )
    }
}