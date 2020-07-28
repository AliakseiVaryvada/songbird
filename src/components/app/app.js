import React from 'react';

import Header from '../header/header';
import CurrentBird from '../current-bird/current-bird';
import ItemList from '../item-list/item-list';
import BirdDetails from '../bird-details/bird-details';

import './app.css';
import NextBtn from "../next-btn";

const App = () => {
    return (
        <div className="container">
            <Header />
            <CurrentBird />

            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList />
                </div>
                <div className="col-md-6">
                    <BirdDetails />
                </div>
            </div>
            <NextBtn />
        </div>
    );
};

export default App;