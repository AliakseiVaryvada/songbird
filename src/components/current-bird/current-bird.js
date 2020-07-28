import React, {Component} from 'react';

import './current-bird.css'
import bwBird from '../../static/media/bwBird.jpg';

export default class CurrentBird extends Component {

    render() {
        return (
            <div className="d-flex justify-content-between container">

                <img src={bwBird} alt="bird"/>
                <h3>******</h3>
                <h3>AUDIOPLAYER</h3>
            </div>
        );
    }
}
