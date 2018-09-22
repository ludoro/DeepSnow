import React, {Component} from 'react';
import logo from '../../assets/img/logo.svg';
import '../../assets/scss/App.css';

import * as ol from 'openlayers';
import {
    interaction, layer, custom, control, //name spaces
    Interactions, Overlays, Controls,     //group
    Map, Layers, Overlay, Util    //objects
} from "react-openlayers";


class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Map view={{center: [11.936324, 46.797476], zoom: 5}}>
                    <Layers>
                        <layer.Tile/>
                    </Layers>
                    <Controls>
                        <control.OverviewMap/>
                    </Controls>
                </Map>
                <a href="https://github.com/allenhwkim/react-openlayers/blob/master/app/controls/overview-map.tsx">source</a>
            </div>
        );
    }


}

export default App;
