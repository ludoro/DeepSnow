/**
 * Created for HackTheAlps2018
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 23.09.18 07:03
 * @copyright: Niklas Kappler, 2018.
 */
import React, {Component } from 'react'
import Toggle from 'react-toggle'
import "react-toggle/style.css"
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions/backendActions";

class ToggleBox extends Component{

    constructor(props){
        super(props);
        this.state = {
            toggle:true
        };
        this.handleBaconChange = this.handleBaconChange.bind(this)
    }

    handleBaconChange(){

        this.props.toggleLayer(!this.state.toggle);
    }

    componentWillReceiveProps(newProps) {
        console.log('revice props');
        console.log(newProps);
        this.setState({ toggle: newProps.backendData.toggle });

    }

    render(){
        return(
            <div className={"toggle-box"}>
                <h3>Layers</h3>
                <div>
                    <label>
                        <Toggle
                            defaultChecked={this.state.toggle}
                            onChange={this.handleBaconChange} />
                        <span><a href={'http://geocatalogo.retecivica.bz.it/geokatalog/#!home&layer=p_bz%3Aca9738bc-5913-454b-bf3a-97197e577fd8'}>Open Data Bozano: Skipisten</a></span>
                    </label>
                </div>
                <hr/>
                <div className='text-center'>(c) DeepSnow, 2018 | <Link to={'/imprint'}>Imprint</Link></div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        backendData: state.backendData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLayer: (bool) => dispatch(actions.toggleLayer(bool))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleBox);
