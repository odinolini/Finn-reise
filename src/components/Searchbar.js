import React, { Component } from 'react';


export default class SearchBarWithAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {stopValue: '', autoComplete: []};
  }

  render() {
    const data = Array.from(this.state.autoComplete)
    const stations = data.map(station => ( <option key={station.ID} onClick={ (e) => this.handleChange(e, station.ID, station.Name)}  > {station.Name} ({station.District})</option> ));
    return (
      <div className="tile">
      <form className="tile is-vertical" >
        <input placeholder={this.props.placeholder} type="text" value={this.state.stopValue} onChange={this.handleStationChange} className="tile is-vertical input is-primary" />
        <select size="5" className="tile is-vertical is-clipped">{stations}</select>
      </form>
      </div>
    );
  }

  handleChange(event, id, name) {
    this.setState({stopValue: event.target.value, chosenFromStation: id});
    this.props.handler(id, name);
  }
  

  handleStationChange = (event) => {
    this.setState({stopValue: event.target.value});
    
    if (event.target.value.length > 2) {
      fetch("https://reisapi.ruter.no/Place/GetPlaces/" + event.target.value)
        .then(result => result.json())
        .then(result => this.setState({autoComplete: result}));
    }
  }
}

