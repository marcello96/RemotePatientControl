import React, { Component } from 'react';
import './WebsiteStart.scss';
import { Link } from "react-router-dom";


class WebsiteStart extends Component {
    render() {
        return(
            <section className="cd-intro">
                <div className="cd-intro-content mask">
                    <h1 data-content="ePatient"><span>ePatient</span></h1>
                    <div className="action-wrapper">
                        <p>
                            <Link to="/login" >
                                <a href="" className="cd-btn main-action">Get started</a>
                            </Link>
                            <a  href="#0" className="cd-btn">About</a>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default WebsiteStart;