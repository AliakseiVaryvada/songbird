import React, {Component} from 'react';

import Header from '../header/header';
import CurrentBird from '../current-bird/current-bird';
import ItemList from '../item-list/item-list';
import BirdDetails from '../bird-details/bird-details';
import BirdData from '../../static/data/birdData';
import WinModal from '../win-modal/win-modal'
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
        categoryNumber: 0,
        random: true,
        enableNextButton: false,
        showCongratulation : false,
        score: 0,
        clearArrayFlag: false,
        selectedBirdId: null,
        disableButtons: false,
        newQuestion : false
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
            this.setState((state) => {
                if (state.categoryNumber < 5) {
                    return {
                        categoryNumber: state.categoryNumber + 1,
                        showCongratulation: false
                    }
                } else {
                    return {
                        categoryNumber: 0,
                        showCongratulation: true
                    }
                }
            })
            if (this.state.categoryNumber < 5) {
                return [this.state.secretBird[0] + 1,
                    Math.floor(Math.random() * Math.floor(6))]
            }
        } else {
            return [0, Math.floor(Math.random() * Math.floor(6))]
        }
    }


    restartGame=()=>{
        this.setState({
            categoryNumber: 0,
            showCongratulation: false,
            secretBird : [0, Math.floor(Math.random() * Math.floor(6))]
        })
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
                    clearArrayFlag: true,
                    newQuestion : true
                }
            })
        }
    }

    clearArrayFlagOff = () => {
        this.setState({clearArrayFlag: false})
    }

    setSelectedBirdId = (id) => {
        this.setState({selectedBirdId: id})
    }

    setDisableButtons = (value) => {
        this.setState({disableButtons : value})
    }
    setNewQuestionInFalse = () =>{
        this.setState({newQuestion : false})
    }
    render() {

        console.log(this.state.secretBird)
        const renderBird = BirdData[this.state.secretBird[0]][this.state.secretBird[1]]


        return (
            <div className="container">

                    <Header
                        score={this.state.score}
                        currentId={this.state.categoryNumber}
                    />
                <div className={this.state.showCongratulation === true ? 'd-none' : ''}>
                    <CurrentBird
                        secretBird={renderBird}
                        winFlag={this.state.enableNextButton}
                    />

                    <div className="row mb2 pt-3">
                        <div className="col-md-6">
                            <ItemList
                                secretBird={renderBird}
                                birdList={BirdData[this.state.secretBird[0]]}
                                enableNextQuestion={this.enableNextQuestion}
                                clearArrayFlag={this.state.clearArrayFlag}
                                clearArrayFlagOff={this.clearArrayFlagOff}
                                setSelectedBirdId={this.setSelectedBirdId}
                                disableButtons = {this.state.disableButtons}
                                setNewQuestionInFalse = {this.setNewQuestionInFalse}
                            />
                        </div>
                        <div className="col-md-6">
                            <BirdDetails
                                birdList={BirdData[this.state.secretBird[0]]}
                                selectedBirdId={this.state.newQuestion ? null : this.state.selectedBirdId}
                                setDisableButtons = {this.setDisableButtons}
                            />
                        </div>
                    </div>
                    <NextBtn
                        enableNextButton={this.state.enableNextButton}
                        openNextQuestion={this.openNextQuestion}
                    />
                </div>
                <div className={this.state.showCongratulation === false ? 'd-none' : ''}>
                    <WinModal
                        score = {this.state.score}
                        restartGame = {this.restartGame}
                    />
                </div>
            </div>
        );
    }
};

