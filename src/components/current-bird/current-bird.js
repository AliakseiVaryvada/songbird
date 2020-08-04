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

    getPhotoWithRightHeight = (response) => {

        let photoDetails =  response.photos.photo[Math.floor(Math.random() * Math.floor(9))];
        console.log(photoDetails.height_m)
        if (photoDetails.height_m < 360) {
            console.log(photoDetails.url_m)
            return photoDetails.url_m
        } else {
            return this.getPhotoWithRightHeight(response)
        }
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
                this.setState({
                    photo: this.getPhotoWithRightHeight(response)
                }))
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
