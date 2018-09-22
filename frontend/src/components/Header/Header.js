/**
 * Created for coding-challenge
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 12.09.18 16:29
 * @copyright: Niklas Kappler, 2018.
 */
import React, {Component} from 'react';

class Header extends Component {
    render() {
        return(
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a class="navbar-brand" href="#">Ski Slopes Detection</a>
            </nav>
        )
    }
}

export default Header;