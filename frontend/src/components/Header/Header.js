/**
 * Created for coding-challenge
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 12.09.18 16:29
 * @copyright: Niklas Kappler, 2018.
 */
import React, {Component} from 'react';
import logo from '../../assets/img/deepsnowlogo.png';

class Header extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt={"The Logo"} id="mainlogo"/>
                    </a>
            </nav>
        )
    }
}

export default Header;