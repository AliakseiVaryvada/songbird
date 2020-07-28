import React, { Component } from 'react';

import  './header.css'


const Header = () => {
    return (


        <div className="header d-flex container">
            <div className="top-panel d-flex">
                <h3>
                    <a href="#">
                        SongBird
                    </a>
                </h3>
                <h5>Score: <span className="score">0</span></h5></div>
            <ul className="pagination">
                <li className="page-item"><a className="page-link" href="/#">Разминка</a></li>
                <li className="page-item"><a className="page-link" href="/#">Воробьиные</a></li>
                <li className="page-item"><a className="page-link" href="/#">Лесные птицы</a></li>
                <li className="page-item"><a className="page-link" href="/#">Певчие птицы</a></li>
                <li className="page-item"><a className="page-link" href="/#">Хищные птицы</a></li>
                <li className="page-item"><a className="page-link" href="/#">Морские птицы</a></li>
            </ul>
        </div>

    );
};

export default Header;
