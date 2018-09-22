import React, {Component} from 'react';
import OpenMap from '../../components/OpenLayerMap/OpenMap';
import Header from '../../components/Header/Header';
import '../../assets/scss/App.css';



class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <OpenMap lat={739218} lon={5906096} zoom={8}></OpenMap>
            </div>
        );
    }


}

export default App;
