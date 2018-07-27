import React, {
    Component
} from 'react';

//Foursquare API
const client_id = "UISD4REMOZSQ2J5NJAXNQFUXNNNN121QPQ5XVC1AGKWXMMVB";
const client_secret = "4FEOXYFGY0F0ASIPCTOVAPBSIJ44OO5JOYQFJYRGSQ2RUI0P";


export const getVenueDetails = (venue) =>
    fetch('https://api.foursquare.com/v2/venues/' +
        venue + '?client_id=' + client_id +
        '&client_secret=' + client_secret +
        '&v=20180407', {
            headers: {}
        })
    .then(response => response.json())
    .then(r => r)

export const getVenueLists = (venue) =>
    fetch('https://api.foursquare.com/v2/venues/' +
        venue + '/listed?client_id=' + client_id +
        '&client_secret=' + client_secret +
        '&v=20180407', {
            headers: {}
        })
    .then(response => response.json())
    .then(r => r)

//Google Maps
class FoursquareGoogleMaps extends Component {
    state = {
        myMap: {},
        markers: [],
        infoWindow: {}
    }

    componentWillMount() {
        let bodyEl = document.querySelector('body');
        let mapElement = document.createElement('div');
        mapElement.id = 'map';
        bodyEl.appendChild(mapElement);
        let scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.defer = true;
        window.gm_authFailure = function() {
           alert("google api is not responding");
       };
        scriptElement.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.props.myKey + '&v=3&callback=initMap';
        bodyEl.appendChild(scriptElement);
        window.initMap = this.initMap;
    }


    // Initializes the map
    initMap = () => {
        const mapOpen = new window.google.maps.Map(document.getElementById('map'), {
            center: {
                lat: this.props.home.lat,
                lng: this.props.home.lng
            },
            zoom: 14
        });
        //Creates info window
        const infoWindow = new window.google.maps.InfoWindow({
            maxWidth: 170
        });
        this.setState({
            infoWindow
        }, (() =>
            this.setState({
                myMap: mapOpen
            }, (() => {
                //Initialize all markers
                const locations = this.props.locations;
                const theMap = this.state.myMap
                const bounds = new window.google.maps.LatLngBounds();
                let markers = locations.map((loc, i) => {
                    const marker = new window.google.maps.Marker({
                        map: theMap,
                        position: loc.location,
                        title: loc.name,
                        animation: window.google.maps.Animation.DROP,
                        id: loc.id
                    });
                    bounds.extend(marker.position);
                    marker.addListener('click', () => {
                        this.populateInfoWindow(marker, infoWindow, theMap);
                    });
                    return marker
                })
                theMap.fitBounds(bounds);
                this.setState({
                    markers
                });
            }))
        ))
    }

    //Removes or adds animation to a marker
    isSelected = (marker) => {
        const selectedLoc = this.props.selectedLocation;
        const infoWindow = this.state.infoWindow;
        if (marker.id === selectedLoc.id) {
            this.populateInfoWindow(marker, infoWindow, this.state.myMap);
            return window.google.maps.Animation.BOUNCE
        }
        return null
    };

    //API Foursquare fill info window with data
    populateInfoWindow = (marker, infoWindow, theMap) => {
        infoWindow.setContent('Loading...');
        getVenueDetails(marker.id)
            .then(venue => {
                const vDetails = venue.response.venue
                const infoContent = this.buildInfoWindowContent(vDetails);
                infoWindow.setContent(infoContent);
                infoWindow.open(theMap, marker);
            })
            .catch(err => {
                infoWindow.setContent(`<div><span>No venue's info</span><p>Error: ${err}</p></div>`)
                infoWindow.open(theMap, marker);
            })
    };

    // Created the HTML to be used on the info content if it exists on the response
    buildInfoWindowContent = (vDetails) => {
        let content = '<div class="info-window">'
        content += vDetails.name ? `<h3>${vDetails.name}</h3>` : '';
        content += vDetails.location.address ? `<h4>${vDetails.location.address}</h4>` : '';
        content += vDetails.categories[0].name ? `<h5>${vDetails.categories[0].name}</h5>` : '';
        return content;
    };

    render() {
        const {
            filteredLocations
        } = this.props;
        const markers = this.state.markers
        let filteredMarkers = markers.filter(mk => {
            mk.setMap(null);
            return filteredLocations.some(loc => loc.id === mk.id)
        })

        return ( <
            div > {
                filteredMarkers.forEach(mk => {
                    mk.setAnimation(this.isSelected(mk));
                    mk.setMap(this.state.myMap);
                })
            } <
            /div>
        );
    }
}

export default FoursquareGoogleMaps
