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

        this.props.setSelectedBirdId(id)
        this.props.setNewQuestionInFalse();

        if (id === this.props.secretBird.id) {
            console.log('WIN!')
            this.setState(function (state) {
                const arrayIds = state.clickedIds
                arrayIds.push(id)
                return ({winFlag: true, mixFlag: false, clickedIds: arrayIds})
            })
            let scoreCounter  = 5 - document.getElementsByClassName('error').length
            console.log('scoreCounter : ' + scoreCounter)
            this.props.enableNextQuestion(scoreCounter);

        } else {
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

    onWait = () => {
        console.log('wait')
    }

    // mixElements = (renderList) => {
    //     if (this.state.mixFlag === false) {
    //         for (let i = renderList.length - 1; i > 0; i--) {
    //             let j = Math.floor(Math.random() * (i + 1));
    //             [renderList[i], renderList[j]] = [renderList[j], renderList[i]];
    //         }
    //         console.log(renderList);
    //         this.setState({mixFlag: true})
    //     }
    //     return renderList;
    // }

    render() {
        const {birdList, secretBird, disableButtons} = this.props;
        const renderList = birdList.map((item, index) => {
            const {id, name, species} = item;
            return (
                <Item
                    onItemSelected={disableButtons ? this.onWait : this.onItemSelected}
                    key={id}
                    id={id}
                    name={name}
                    secretId={secretBird.id}
                    selected={this.state.clickedIds.includes(id)}
                    disableElement = {disableButtons}
                />
            );
        })

        // let listItemMixedArray = this.mixElements(renderList)
        return (
            <div className="card birds-list">
                <ul className="item-list list-group">
                    {renderList}
                </ul>
            </div>
        )
    }
}