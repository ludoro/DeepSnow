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

import { saveAs } from 'file-saver/FileSaver';

import file from '../../assets/GeokatalogExport.gml';
import kml_file from '../../assets/2012-02-10.kml';

class OpenLayerMap extends Component {

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.map = "";
        this.layers = [];

    }

    componentDidMount() {
        var style = new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.6)'
            }),
            stroke: new Stroke({
                color: '#319FD3',
                width: 1
            }),
            text: new Text({
                font: '12px Calibri,sans-serif',
                fill: new Fill({
                    color: '#000'
                }),
                stroke: new Stroke({
                    color: '#fff',
                    width: 3
                })
            })
        });

        //------------------------------------------
        // Layer config
        //------------------------------------------
        var raster = new TileLayer({
            source: new BingMaps({
                imagerySet: 'Aerial',
                key: 'AtfUaJMvupeiWSIg5zr0I4oa4yT-SWqhIzGdg3sNN8trkH-6XrwgKCuKwlukXG-Z'
            })
        });
        //------------------------------------------
        var KML_vector = new VectorLayer({
            source: new VectorSource({
                url: kml_file,
                format: new KML()
            })
        });
        var GML_vector = new VectorLayer({
            source: new VectorSource({
                url: file,
                format: new GML()
            })
        });
        //------------------------------------------
        var source = new VectorSource();
        var Draw_vector = new VectorLayer({
            source: source,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        //------------------------------------------


        //------------------------------------------
        // Create map
        //------------------------------------------

        this.layers = [
            new TileLayer({
                source: new OSM()
            }),
            raster,
            KML_vector,
            Draw_vector,
        ];

        var options = {
            layers: this.layers,
            target: this.mapRef.current,
            view: new View({
                center: [this.props.lat, this.props.lon],
                projection: 'EPSG:3857',
                zoom: this.props.zoom
            })
        };

        this.map = new Map(options);


        //------------------------------------------
        // Handlers
        //------------------------------------------
        var modify = new Modify({source: source});
        this.map.addInteraction(modify);

        var draw, snap; // global so we can remove them later
        var typeSelect = 'Point';

        draw = new Draw({
            source: source,
            type: typeSelect
        });
        this.map.addInteraction(draw);
        snap = new Snap({source: source});
        this.map.addInteraction(snap);

        this.map.on('click', function(event) {
            console.log('i am here');
            console.log(event.coordinate);
            console.log(event.pixel);
            console.log(event.originalEvent.srcElement);
            

            event.originalEvent.srcElement.toBlob(function(blob) {
                saveAs(blob, 'map.png');
            });

        })

    }

    render() {
        return (

            <div id="map" ref={this.mapRef}>
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