import React, { Component } from 'react';

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
        secretBird : this.getRandomBird(),
        random: true
    }

    getRandomBird(){

        return [Math.floor(Math.random() * Math.floor(6)),
                Math.floor(Math.random() * Math.floor(6))]

    }
    //
    // componentDidMount() {
    //     this.getRandomBird()
    // }

    render() {

        console.log(this.state.secretBird)
        console.log(BirdData[this.state.secretBird[0]][this.state.secretBird[1]])

        return (
            <div className="container">
                <Header/>
                <CurrentBird secretBird = {BirdData[this.state.secretBird[0]][this.state.secretBird[1]]}/>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            secretBird = {BirdData[this.state.secretBird[0]][this.state.secretBird[1]]}
                            birdList = {BirdData[this.state.secretBird[0]]}/>
                    </div>
                    <div className="col-md-6">
                        <BirdDetails/>
                    </div>
                </div>
                <NextBtn/>
            </div>
        );
    }
};

