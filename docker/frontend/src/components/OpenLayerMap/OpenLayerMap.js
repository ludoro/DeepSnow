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
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import KML from 'ol/format/KML.js';
import GML from 'ol/format/GML.js';
import BingMaps from 'ol/source/BingMaps.js';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js';
import Polygon from 'ol/geom/Polygon';
import Vector from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import { connect } from "react-redux";
import * as proj from 'ol/proj';

import file from '../../assets/GeokatalogExport.kml';



class OpenLayerMap extends Component {



    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.map.getLayers().getArray().forEach(function(layer, i, array) {
            if (layer.get('name') === 'slopelayer') {
                try{
                    layer.setVisible(newProps.backendData.toggle);
                    console.log("oklayer")
                }catch(err){
                    console.log("noklayer")
                }

            }
        }, this);


    }

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
                url: file,
                format: new KML()
            })
        });
        KML_vector.set('name', 'slopelayer');
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
            Draw_vector
        ];

        var options = {
            layers: this.layers,
            target: this.mapRef.current,
            view: new View({
                center:  proj.fromLonLat([this.props.lat, this.props.lon]), //[11.937110,46.752674]),//,
                projection: 'EPSG:3857',
                zoom: this.props.zoom
            })
        };

        this.map = new Map(options);


        //------------------------------------------
        // Handlers
        //------------------------------------------
        // var modify = new Modify({source: source});
        // this.map.addInteraction(modify);

        // var draw, snap; // global so we can remove them later
        // var typeSelect = 'Point';

        // draw = new Draw({
        //     source: source,
        //     type: typeSelect
        // });
        // this.map.addInteraction(draw);
        // snap = new Snap({source: source});
        // this.map.addInteraction(snap);

        this.map.on('click', function(event) {
            //console.log(map)
            console.log("event map")
            console.log(event.map)
            console.log("event map getleyaeres")
            console.log(event.map.getLayers())
            //event.map.removeLayer('testlayer')
            //layer.setVisibility(true)


            // event.map.once('rendercomplete', function(event) {
            //     console.log("redner done")
            //     console.log(event)
            //     event.originalEvent.srcElement.toBlob(function(blob) {
            //         saveAs(blob, 'map.png');
            //     });
            // });


            event.map.getLayers().getArray().forEach(function(layer, i, array) {
                if (layer instanceof VectorLayer) {
                    try{
                        layer.setVisible(false);
                        console.log("oklayer")
                    }catch(err){
                        console.log("noklayer")
                    }

                }
            }, this);

            setTimeout(function(){
                //event.originalEvent.srcElement.toBlob(function(blob) {
                // saveAs(blob, 'map.png');
                // var xhttp = new XMLHttpRequest();
                // xhttp.open("GET", "demo_get2.asp?fname=Henry&lname=Ford", true);
                // xhttp.send();
                var params = 'x='+event.pixel[0]+'&y='+event.pixel[1]+'&img='+event.originalEvent.srcElement.toDataURL();
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        console.log(event.map)
                        console.log("responstext")
                        console.log(xhr.responseText)




                        try{
                            var myObj = JSON.parse(xhr.responseText);
                            console.log(myObj)



                            var newCoordinates = [];
                            for(var i in myObj){
                                var coor = (myObj[i][0])
                                coor = [parseInt(coor[0])+event.pixel[0]-256, parseInt(coor[1])+event.pixel[1]-256]
                                var coorgeo = event.map.getCoordinateFromPixel(coor);
                                newCoordinates.push(coorgeo);
                            }
                            newCoordinates.push(newCoordinates[0].slice());

                            var polygon = new Polygon([newCoordinates]);

                            // Create feature with polygon.
                            var feature = new Feature(polygon);

                            // Create vector source and the feature to it.
                            var vectorSource = new VectorSource();
                            vectorSource.addFeature(feature);

                            // Create vector layer attached to the vector source.
                            var vectorLayer = new Vector({
                                source: vectorSource
                            });

                            // Add the vector layer to the map.
                            event.map.addLayer(vectorLayer);




                        }catch(err){
                            console.log("something wrong when parsing JSON"+err)
                        }

                        //map.getCoordinateFromPixel([event.pixel[0],event.pixel[1]]);


                        //alert(xhr.responseText);
                    }
                }
                // xhr.open('POST', 'http://172.31.201.157:5000/api/prediction', true); // <-- external backend
                xhr.open('POST', 'http://localhost:5000/api/prediction', true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(params);
                //console.log(params)

            //});
        }, 500);
            setTimeout(function(){
                console.log("showing layers")
                event.map.getLayers().getArray().forEach(function(layer, i, array) {
                    if (layer instanceof VectorLayer && layer.get('name') !== 'slopelayer') {
                        layer.setVisible(true);
                    }
                }, this);

            }, 1500);

            // vectorLayerArray.forEach(function(aVecLayer) {
            //     //aVecLayer.getSource();
            //     aVecLayer.setVisibility(false)
            // })
            // console.log('i am here');
            // console.log(event.coordinate);
            // console.log(event.pixel);
            // console.log(event.originalEvent.srcElement);




        })

    }

    render() {
        return (

            <div id="map" ref={this.mapRef}>
            </div>

        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        backendData: state.backendData,
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         sendImage: (image, coordinates) => dispatch(actions.sendImage(image, coordinates))
//     }
// };

export default connect(mapStateToProps)(OpenLayerMap);

OpenLayerMap.propTypes = {
    lat: PropTypes.number,
    lon: PropTypes.number,
    zoom: PropTypes.number
};

