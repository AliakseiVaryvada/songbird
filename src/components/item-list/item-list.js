import React, { Component } from 'react';

import  './item-list.css'
export default class ItemList extends Component {

    state = {
        secretBird: this.props.secretBird,
        birdList: this.props.birdList
    }

    onItemSelected(id){
        console.log(id)
        if (id === this.state.secretBird.id){
            console.log('WIN!')

        } else {
            console.log('LOSE!')
        }
    }
    render() {
        const { birdList, secretBird } = this.props;

        console.log(this.state)

        const renderList = birdList.map((item) => {
            const { id, name, species } = item;
           console.log(species)
            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.onItemSelected(id)}>
                    <span className="li-btn"></span>
                    {name}
                </li>
            );
        });


        return (
            <div className="col-md-6">
                <ul className="item-list list-group">
                    {renderList}
                </ul>
            </div>
        )
    }
}