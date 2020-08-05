import React, {Component} from 'react';

import './next-btn.css'

import Services from "../../services/api-service";


export default class NextBtn extends Component {

    render() {
        const enable = this.props.enableNextButton
        return (


            <div>
                <button className={enable ? 'btn-next btn mt-3 mb-4' : 'btn mt-3 mb-4'} disabled={!enable}
                        onClick={this.props.openNextQuestion}>Next Question
                </button>
            </div>
        )
    }
}