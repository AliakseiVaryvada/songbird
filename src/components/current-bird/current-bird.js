import React, {Component} from 'react';

import './current-bird.css'
import bwBird from '../../static/media/bwBird.jpg';
import Services from '../../services/api-service'
//import BirdDetails from "../bird-details/bird-details";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default class CurrentBird extends Component {

    services = new Services();

    state = {
        secretBird: null,
        photoDefault: bwBird,
        photo: null,
        name: null,
        audio: null,
        displayLoader: 'none',
        displayContent: ''
    }

    componentDidMount() {
        this.setState({
            displayLoader: 'block',
            displayContent: 'none'
        })
    }

    getPhotoWithRightHeight = (response) => {

        let photoDetails = response.photos.photo[Math.floor(Math.random() * Math.floor(9))];
        console.log(photoDetails.height_m)
        if (photoDetails.height_m < 380) {
            console.log(photoDetails.url_m)
            return photoDetails.url_m
        } else {
            return this.getPhotoWithRightHeight(response)
        }
    }

    constructor(props) {
        super();
        this.birdPhoto(props.secretBird.species)
        //   this.birdSong(props.secretBird.species)
        this.state.name = props.secretBird.name

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.warn(this.props.secretBird)
        if (this.props.secretBird.name !== prevState.name) {
            this.setState({
                displayLoader: 'none',
                displayContent: ''
            })
            console.log('CONSTRUCTOR : ' + this.props.secretBird.name)
            this.birdPhoto(this.props.secretBird.species)
            //   this.birdSong(props.secretBird.species)
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
            ).then(() =>
            this.setState({
                displayLoader: 'none',
                displayContent: ''
            })
        )
    }

    // birdSong(name) {
    //     console.log('birdSong ' + name)
    //     this.services
    //         .getBirdSong(name)
    //         .then((response) => {
    //             console.log(response)
    //             this.setState({
    //                 song: 'https:' + response.recordings[
    //                     Math.floor(Math.random() * Math.floor(response.recordings.length - 1))].file
    //             })
    //         }).then(() =>
    //         this.setState({
    //             displayLoader: 'none',
    //             displayContent: ''
    //         })
    //     )
    // }

    render() {
        const winFlag = this.props.winFlag;
        const blurStyle = winFlag ? '' : 'blur-secret-bird'
        const playerStyle = {
            background: 'transparent'
        };
        const audioPlayer = <AudioPlayer
            autoPlay={false}
            autoPlayAfterSrcChange={false}
            src={this.props.secretBird.audio}
            showJumpControls={false}
            style={playerStyle}
            layout='horizontal-reverse'
        />

        const {photo, name} = this.state
        return (
            <div className="card container">
                <div style={{display: this.state.displayLoader}} className="loader-current">Loading...</div>
                <div style={{display: this.state.displayContent}}>
                    <div className='row'>
                        <div className='col-3'>
                            <img src={photo} alt="bird" className={blurStyle + ' bird-img'}/>
                        </div>

                        <ul className='col list-group list-group-flush'>
                            <li className='list-group-item'>
                                <h3 className={blurStyle}>{winFlag ? name : 'Songbird:)'}</h3>
                            </li>
                            <li className='list-group-item'>
                                <div className='player-container'>
                                    {audioPlayer}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
