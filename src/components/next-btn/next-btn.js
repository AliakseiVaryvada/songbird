import React, {Component} from 'react';

import './next-btn.css'

import Services from "../../services/api-service";



export default class NextBtn extends Component {

    render() {

        return (
            <div>
            <button disabled={!this.props.enableNextButton} onClick={this.props.openNextQuestion}>Next Q</button>
            </div>
    )}
}