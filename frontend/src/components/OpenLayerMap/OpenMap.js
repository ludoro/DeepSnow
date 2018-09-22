/**
 * Created for HackTheAlps2018
 *
 * @author: Niklas Kappler <mail@niklas-kappler.de>
 * @date: 22.09.18 14:33
 * @copyright: Niklas Kappler, 2018.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Draw, Modify, Snap} from 'ol/interaction.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import KML from 'ol/format/KML.js';
import GML from 'ol/format/GML.js';
import BingMaps from 'ol/source/BingMaps.js';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js';
import Poligon from 'ol/geom/Polygon';

import file from '../../assets/GeokatalogExport.gml';
import kml_file from '../../assets/2012-02-10.kml';

class OpenLayerMap extends Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.map = "";

    }

    componentDidMount() {

        //------------------------------------------
        // Create map
        //------------------------------------------
        var options = {
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            target: this.mapRef.current,
            view: new View({
                center: [this.props.lat, this.props.lon],
                projection: 'EPSG:3857',
                zoom: this.props.zoom
            })
        };

        this.map = new Map(options);

        this.map.on('click', function (event) {
            console.log('i am here');
            console.log(event.coordinate);
            console.log(event.pixel);
            console.log(event);



        })

    }

    onClickHanlder(event){
        this.map.once('postcompose', function() {
            var canvas = event.context.canvas;
            canvas.toBlob(function(blob) {
                //saveAs(blob, 'map.png');
            });
        });
        this.map.renderSync();
    }

    render() {
        return (
            <div>
                <div id="map" ref={this.mapRef}>
                </div>
                <button onClick={this.onClickHanlder()}>click</button>
            </div>

        )
    }
}

export default OpenLayerMap;

OpenLayerMap.propTypes = {
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number
};