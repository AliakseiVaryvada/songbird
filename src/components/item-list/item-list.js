import React, {Component} from 'react';
import Item from '../item/item'
import './item-list.css'


export default class ItemList extends Component {
    state = {
        clickedIds: [],
        winFlag: false,
        mixFlag: false,
        secretBird: this.props.secretBird,
        birdList: this.props.birdList
    }

    onItemSelected = (event) => {
        //  console.log(event.target.id)
        //  console.log(this.props.secretBird.id)
        const id = parseInt(event.target.id);

        if (id === this.props.secretBird.id) {
            console.log('WIN!')
            this.setState(function (state) {
                const arrayIds = state.clickedIds
                arrayIds.push(id)
                return ({winFlag: true, mixFlag: false, clickedIds: arrayIds})
            })
            this.props.enableNextQuestion('win');

        } else {
            console.log('LOSE!')
            if(this.state.winFlag === false && !this.state.clickedIds.includes(id)) {
                this.setState(function (state) {
                    const arrayIds = state.clickedIds
                    arrayIds.push(id)
                    return ({clickedIds: arrayIds})
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props)
        if (this.props.clearArrayFlag === true && prevProps.clearArrayFlag === false){
            this.setState({clickedIds: [], winFlag : false})
            this.props.clearArrayFlagOff()
        }
    }

    render() {
        const {birdList, secretBird} = this.props;
        const renderList = birdList.map((item, index) => {
            const {id, name, species} = item;
            return (
                <Item
                    onItemSelected={this.onItemSelected}
                    id={id}
                    name={name}
                    secretId={secretBird.id}
                    selected={this.state.clickedIds.includes(id)}
                />
            );
        })

        if (this.state.mixFlag === false) {
            for (let i = renderList.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [renderList[i], renderList[j]] = [renderList[j], renderList[i]];
            }
            this.setState({mixFlag: true})
        }

        return (
            <div className="col-md-6">
                <ul className="item-list list-group">
                    {renderList}
                </ul>
            </div>
        )
    }
}