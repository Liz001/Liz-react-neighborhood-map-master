import React from 'react';
import GoogleMaps from './GoogleMaps'
import Search from './Search';
import Header from './Header'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state.locations = [
      //Ideally, this would be fetched from a DB and update the state with it.
     { name: 'Cattedrale', id: '4c3f6aa0520fa593428fc6ac', location: {lat: 38.11437, lng: 13.3560026} },
      { name: 'Fontana Pretoria', id: '4ccd91cf54f0b1f72c541dca', location: {lat: 38.1154832, lng: 13.3620746} },
      { name: 'Cappella Palatina', id: '4df227bb88772e1f814e47e0', location: {lat: 38.1108871, lng: 13.353536} },
      { name: 'Chiesa della Martorana', id: '4f0c3f05e4b02a8da6267402', location: {lat: 38.114766, lng: 13.362868} },
      { name: 'Teatro Politeama', id: '4dc0536743a147cd6ed6749d', location: {lat: 38.125103 , lng: 13.356651} },
    ];
    //initializing the filtered locations to include all locations
    this.state.filteredLocations = this.state.locations;
  }

  state = {
    locations: [],
    filteredLocations: [],
    selectedLocation: ''
  }

  // Adds or clears the state of selectedLocation
  selectLocation = (location) => {
    if (location.id === this.state.selectedLocation.id) {
      this.setState({selectedLocation: ''});
    } else {
      this.setState({selectedLocation: location});
    }
  }

  // Helps to filter the list and updates the state of the filtered locations
  queryUpdate = (value) => {
    this.setState(currentState => {
      let filteredLocations = [];
      const curLocations = currentState.locations;
      if(value !== '') {
        filteredLocations = curLocations.filter(loc => {
          return loc.name.toLowerCase().includes(value.toLowerCase());
        })
      } else {
        filteredLocations = curLocations;
      }
      return({filteredLocations});
    });
  }

  render() {
    return (
        <div>
          <Header />
          <GoogleMaps
            locations={this.state.locations}
            filteredLocations={this.state.filteredLocations}
            selectedLocation={this.state.selectedLocation}
            myKey={'AIzaSyDwoBGmWobsDx5mUPLI8x6i9YkkgqeYXOU'}
            home={{ lat: 38.115687, lng: 13.361267 }}
          />
          <Search
            locations={this.state.locations}
            filteredLocations={this.state.filteredLocations}
            selectedLocation={this.state.selectedLocation}
            selectLocation={this.selectLocation}
            queryUpdate={this.queryUpdate}
          />
        </div>
    );
  }
}

export default App;
