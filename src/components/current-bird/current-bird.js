import React, {Component} from 'react';

import './current-bird.css'
import bwBird from '../../static/media/bwBird.jpg';
import Services from '../../services/api-service'

export default class CurrentBird extends Component {

    services = new Services();

    state = {
        secretBird: null,
        photoDefault: bwBird,
        photo: null,
        name: null,
        audio: null
    }

    constructor(props) {
        super();
        this.birdPhoto(props.secretBird.species)
        this.state.name = props.secretBird.name
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.warn(this.props.secretBird)
        if(this.props.secretBird.name !== prevState.name) {
            console.log('CONSTRUCTOR : ' + this.props.secretBird.name)
            this.birdPhoto(this.props.secretBird.species)
            this.state.name = this.props.secretBird.name
        }
    }

    birdPhoto(name) {
        console.log(name)
        this.services
            .getPhoto(name)
            .then((response) => (
                this.setState({photo: response.photos.photo[Math.floor(Math.random() * Math.floor(3))].url_m}))
            )
    }

    render() {
        console.log(this.props)

        const {photo, name, audio} = this.state
        return (
            <div className="d-flex justify-content-between container">

                <img src={photo} alt="bird" className="bird-img"/>
                <h3>{name}</h3>
                <h3>AUDIOPLAYER</h3>
            </div>
        );
    }
}
