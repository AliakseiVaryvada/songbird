import React, {Component} from 'react';

import Header from '../header/header';
import CurrentBird from '../current-bird/current-bird';
import ItemList from '../item-list/item-list';
import BirdDetails from '../bird-details/bird-details';

import BirdData from '../../static/data/birdData';

import './app.css';
import NextBtn from "../next-btn";
// import Services from '../../services/api-services'

//
// const testee = new APIServices()
// console.log(testee.getBirdPhoto())


export default class App extends Component {
    // services = new Services()
    state = {
        secretBird: this.getBird(),
        random: true,
        enableNextButton: false,
        score: 0,
        clearArrayFlag: false,
        selectedBirdId : null

    }

    // getRandomBird() {
    //     const question = [Math.floor(Math.random() * Math.floor(6)),
    //         Math.floor(Math.random() * Math.floor(6))]
    //
    //     if (this.state) {
    //         if (question[0] === this.state.secretBird[0] && question[1] === this.state.secretBird[1]) {
    //             this.getRandomBird()
    //         } else {
    //             return question
    //         }
    //     } else {
    //         return question
    //     }
    //
    // }

    getBird() {

        if (this.state) {
            return [this.state.secretBird[0] + 1,
                Math.floor(Math.random() * Math.floor(6))]
        } else {
            return [0, Math.floor(Math.random() * Math.floor(6))]
        }
    }


    enableNextQuestion = (score) => {
        if (this.state.enableNextButton === false) {
            this.setState((state) => {
                return {
                    score: state.score + score,
                    enableNextButton: true
                }
            })
        }
    }

    openNextQuestion = () => {
        if (this.state.enableNextButton === true) {
            this.setState((state) => {
                return {
                    enableNextButton: false,
                    secretBird: this.getBird(),
                    clearArrayFlag: true
                }
            })
        }
    }



    clearArrayFlagOff = () => {
        this.setState({clearArrayFlag: false})
    }

    setSelectedBirdId = (id) => {
        console.log('SET ID')
        this.setState({selectedBirdId: id})
    }

    render() {

        console.log(this.state.secretBird)
        const renderBird = BirdData[this.state.secretBird[0]][this.state.secretBird[1]]

        return (
            <div className="container">
                <Header score={this.state.score}/>
                <CurrentBird secretBird={renderBird}/>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            secretBird={renderBird}
                            birdList={BirdData[this.state.secretBird[0]]}
                            enableNextQuestion={this.enableNextQuestion}
                            clearArrayFlag={this.state.clearArrayFlag}
                            clearArrayFlagOff={this.clearArrayFlagOff}
                            setSelectedBirdId = {this.setSelectedBirdId}
                        />
                    </div>
                    <div className="col-md-6">
                        <BirdDetails
                            birdList={BirdData[this.state.secretBird[0]]}
                            selectedBirdId = {this.state.selectedBirdId}
                        />
                    </div>
                </div>
                <NextBtn
                    enableNextButton={this.state.enableNextButton}
                    openNextQuestion={this.openNextQuestion}
                />
            </div>
        );
    }
};

