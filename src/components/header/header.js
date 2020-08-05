import React, {Component} from 'react';

import './header.css'
import Logo from '../../static/media/logo-bird.svg'

export default class Header extends Component {
    render() {
        const score = this.props.score
        const id = this.props.currentId
        console.log(id)
        //{id === 0 ? "page-link active-question" : 'page-link'}
        return (

            <div className="header d-flex container">
                <div className="top-panel d-flex">
                    <h3>
                        <a href="#">
                            <img className='logo' src={Logo}/>
                        </a>
                    </h3>
                    <h5>Score: <span className="score">{score}</span></h5></div>
                <ul className="pagination">
                    <li className='page-item'>
                        <a className={ id !== 0 ?  "page-link" : "page-link page-link-active"} href="/#">Разминка</a>
                    </li>
                    <li className={"page-item"}>
                        <a className={ id !== 1 ?  "page-link" : "page-link page-link-active"} href="/#">Воробьиные</a>
                    </li>
                    <li className="page-item  active-question">
                        <a className={ id !== 2 ?  "page-link" : "page-link page-link-active"} href="/#">Лесные птицы</a>
                    </li>
                    <li className="page-item">
                        <a className={ id !== 3 ?  "page-link" : "page-link page-link-active"} href="/#">Певчие птицы</a>
                    </li>
                    <li className="page-item">
                        <a className={id !== 4 ? "page-link" : "page-link page-link-active"} href="/#">Хищные птицы</a>
                    </li>
                    <li className="page-item">
                        <a className={id !== 5 ? "page-link" : "page-link page-link-active"} href="/#">Морские птицы</a>
                    </li>
                </ul>
            </div>

        );
    };
}


