import React, {Component} from 'react';

import './bird-details.css'
import Services from '../../services/api-service'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default class BirdDetails extends Component {
    services = new Services();
    state = {
        photo: null,
        song: null,
        displayLoader: 'none',
        displayContent: 'none'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if ((prevProps.selectedBirdId !== this.props.selectedBirdId) && (this.props.selectedBirdId !== null)) {
            this.birdPhoto(this.props.birdList[this.props.selectedBirdId - 1].species)
            this.birdSong(this.props.birdList[this.props.selectedBirdId - 1].species)
            this.props.setDisableButtons(true);
            this.setState({
                displayLoader: 'block',
                displayContent: 'none'
            })
        }
    }

    getPhotoWithRightHeight = (response) => {

        let photoDetails = response.photos.photo[Math.floor(Math.random() * Math.floor(50))];
        console.log(photoDetails.height_m + ' ' + photoDetails.width_m)
        if (photoDetails.height_m < 360 && photoDetails.id !== '50176609513') {
            console.log(photoDetails.url_m)
            return photoDetails.url_m
        } else {
            return this.getPhotoWithRightHeight(response)
        }
    }

    birdPhoto(name) {
        console.log('birdPhoto ' + name)
        this.services
            .getPhoto(name)
            .then((response) => (
                this.setState({photo: this.getPhotoWithRightHeight(response)}))
            )
    }

    birdSong(name) {
        console.log('birdSong ' + name)
        this.services
            .getBirdSong(name)
            .then((response) => {
                let contents = JSON.parse(response.contents);
                console.log(contents)
                if (contents.numRecordings === '0') {
                    this.setState({
                        song: this.props.birdList[this.props.selectedBirdId - 1].audio
                    })
                } else {
                    let songRandomIndex =  Math.floor(Math.random() * (contents.numRecordings - 1))
                    console.log('SETSONG : ' + songRandomIndex)
                    console.log(contents.recordings[songRandomIndex])
                    this.setState({
                        song: 'https:' + contents.recordings[songRandomIndex].file
                    })
                }
            }).then(() => {
            this.props.setDisableButtons(false);
            this.setState({
                displayLoader: 'none',
                displayContent: ''
            })
        })
    }


    render() {
        const playerStyle = {
            background: 'transparent'
        };

        const {birdList, selectedBirdId} = this.props
        const {photo} = this.state
        let className = this.props.selectedBirdId === null ? 'bird-details-img-hide' : 'bird-details-img'
        const audioPlayer = <AudioPlayer
            autoPlay={false}
            autoPlayAfterSrcChange={false}
            src={this.state.song}
            showJumpControls={false}
            style={playerStyle}
            layout='stacked'
        />
        return (
            <div className='container card bird-details'>
                <div style={{display: this.state.displayLoader}} className="loader">Loading...</div>
                <div style={selectedBirdId !== null ? {display: this.state.displayContent} : {display : 'none'}}>
                    <div className='row player-titles'>
                        <img src={photo} alt="bird" className={className}/>
                        <div className='col'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <h4 className='first-title'>{selectedBirdId != null ? birdList[selectedBirdId - 1].name : ''}</h4>
                                </li>
                                <li className='list-group-item'>
                                    <p className='latin-title'>{selectedBirdId != null ? birdList[selectedBirdId - 1].species : ''}</p>
                                </li>
                                <li className='list-group-item'>
                                    <div className='player-container'>
                                        {selectedBirdId != null ? audioPlayer : null}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <span>{selectedBirdId != null ? birdList[selectedBirdId - 1].description : ''}</span>
                    </div>
                </div>

                <div>
                <span>{selectedBirdId != null ? '' :
                    'Послушайте плеер. Выберите птицу из списка'}</span>
                </div>
            </div>
        )
    }
}