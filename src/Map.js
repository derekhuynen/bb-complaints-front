import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import InfoWindowEx from './InfoWindowEx'



export class Maps extends Component {

    state = {
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
    }

    render() {
        return (
            <div>
                {this.state.locRendered ? (
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
                            position={{ lat: 34.2360064, lng: -116.90311679999999 }}
                            address={"123 Walker Street"}
                            onClick={this.onMarkerClick}
                            icon={{url: "/marker.svg",
                                scaledSize: new window.google.maps.Size(12, 12)}}
                        />
                        <InfoWindowEx marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                            <div>
                                <h3>Address: {this.state.activeMarker.address}</h3>
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
