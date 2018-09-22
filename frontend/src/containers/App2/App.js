import React, {Component} from 'react';
import '../../assets/scss/App.css';
import OpenLayerMap from '../../components/OpenLayerMap/OpenLayerMap';
import Header from '../../components/Header/Header';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="container_1920">
                    <OpenLayerMap lat={739218} lon={5906096} zoom={8}></OpenLayerMap>
                </div>
            </div>
        );
    }
}

export default App;
