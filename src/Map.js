import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import InfoWindowEx from './InfoWindowEx'



export class Maps extends Component {

    state = {
        houses: [],
        startLatitude: 0,
        startLongitude: 0,
        latitude: 0,
        longitude: 0,
        locRendered: false,
        showingInfoWindow: false,
        activeMarker: {}
    }

    getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        }
    }

    showPosition = position => {
        this.setState({
            startLatitude: position.coords.latitude,
            startLongitude: position.coords.longitude,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,

            locRendered: true,
        })
    }

    centerMoved = (mapProps, map) => {
        this.setState({
            latitude: map.center.lat(),
            longitude: map.center.lng()
        })
    }

    componentWillMount() {

        this.getUserLocation()

        fetch("http://localhost:5000/api/all")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        houses: result.features,

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

        return (


            <div>



                {this.state.locRendered ? (
                    console.log(this.houses),
                    <Map
                        google={this.props.google}
                        zoom={15}
                        minZoom={6}
                        maxZoom={18}
                        styles={this.props.mapStyles}
                        disableDefaultUI={true}
                        onDragend={this.centerMoved}
                        initialCenter={{
                            lat: this.state.latitude,
                            lng: this.state.longitude
                        }}
                    >
                        <Marker
                            position={{ lat: 34.2370064, lng: -116.90731679999999 }}
                            address={"Address: 123 Walker Street"}
                            onClick={this.onMarkerClick}
                            icon={{url: "/marker.svg",
                                scaledSize: new window.google.maps.Size(12, 12)}}
                        />

                        <Marker
                            position={{ lat: this.state.startLatitude, lng: this.state.startLongitude }}
                            address={"This is you!"}
                            onClick={this.onMarkerClick}
                            icon={{url: "/myLocation.svg",
                                scaledSize: new window.google.maps.Size(12, 12)}}
                        />


                        <InfoWindowEx marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                            <div>
                                <h3>{this.state.activeMarker.address}</h3>
                            </div>
                        </InfoWindowEx>
                    </Map>
                ) : <h1>Map Failed to Render</h1>}
            </div>
        )
    }
    onMarkerClick = (props, marker) => {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
        })
    }
}

Maps.defaultProps = {
    mapStyles: [
        {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
        },
    ]
}

export default GoogleApiWrapper({
        apiKey: 'AIzaSyCPnD2rgmnentLL6PxjFr8oa9tMEatF0Mg'
    })(Maps)
