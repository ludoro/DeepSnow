/**
 * Created for HackTheAlps2018
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 22.09.18 23:41
 * @copyright: Niklas Kappler, 2018.
 */
import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import {Row, Col } from 'reactstrap';

class Imprint extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="container">
                    <Row>
                        <Col xs={12}>
                            <h1>Imprint</h1>
                        </Col>
                        <Col xs={12}>
                            <p className="text-center">
                                This project was created by:
                                    The Goats of Codes
                            </p>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Imprint;
