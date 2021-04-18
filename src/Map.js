import React, { Component } from 'react'
import {json as requestJson} from 'd3-request'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import InfoWindowEx from './InfoWindowEx'



export class Maps extends Component {

    state = {
        data: [],
        loc_x: 0,
        loc_y: 0,
        locRendered: false,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        houses: []
    }

    getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        }
    }

    showPosition = position => {
        this.setState({
            loc_x: position.coords.latitude,
            loc_y: position.coords.longitude,
            locRendered: true,
        })
        console.log(position.coords.latitude, position.coords.longitude)
    }

    centerMoved = (mapProps, map) => {
        this.setState({
            loc_x: map.center.lat(),
            loc_y: map.center.lng()

        })
        console.log(map.center.lat(),map.center.lng())
    }

    componentWillMount() {
        this.getUserLocation()
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/all")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    houses: result.houses
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, houses } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }else {
            return (
                <div>
                    
                    {this.state.locRendered ? (
                        <Map
                            google={this.props.google}
                            zoom={14}
                            styles={this.props.mapStyles}
                            disableDefaultUI={true}
                            onDragend={this.centerMoved}
                            initialCenter={{
                                lat: this.state.loc_x,
                                lng: this.state.loc_y
                            }}
                        >
    
                            <Marker
                                position={{ lat: 34.2360064, lng: -116.90311679999999 }}
                                title={"Hello"}
                                onClick={this.onMarkerClick}
                            />
    
                            <InfoWindowEx marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                                <div>
                                    HELLO!
                                </div>
                            </InfoWindowEx>
                        </Map>
                    ) : null}
                </div>
            )
        }

    }
    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props.data,
            activeMarker: marker,
            showingInfoWindow: true,
            redirect: false
        })
    }
}

Maps.defaultProps = {
    mapStyles: [
        {
            elementType: 'geometry',
            stylers: [
                {
                    color: '#242f3e'
                }
            ]
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#746855'
                }
            ]
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#242f3e'
                }
            ]
        },
        {
            featureType: 'administrative.land_parcel',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#d59563'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#d59563'
                }
            ]
        },
        {
            featureType: 'poi.business',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#263c3f'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#6b9a76'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#38414e'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#212a37'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#9ca5b3'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#746855'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#1f2835'
                }
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#f3d19c'
                }
            ]
        },
        {
            featureType: 'road.local',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off'
                }
            ]
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#2f3948'
                }
            ]
        },
        {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#d59563'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#17263c'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#515c6d'
                }
            ]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#17263c'
                }
            ]
        }
    ]
}

function mapStateToProps(state) {
    return {
        x: state.x,
        y: state.y
    }
}

export default GoogleApiWrapper({
        apiKey: 'AIzaSyCPnD2rgmnentLL6PxjFr8oa9tMEatF0Mg'
    })(Maps)
