import React, { Component } from 'react';
import SearchBar from './components/Searchbar.js';
import './App.css';

//RuterApp
//  SearchBars
//  PageSwitcher
//  

class SearchBars extends Component {
  constructor(props) {
    super(props);
    this.state = {fromStationValue: '', toStationValue: '', autoCompleteFrom: [], autoCompleteTo: [],
    chosenFromStation: "", chosenToStation: "", TravelProposal: []
    };
    this.handleFromStationChange = this.handleFromStationChange.bind(this);
    this.handleToStationChange = this.handleToStationChange.bind(this);
    this.handleFromStationAutoComplete = this.handleFromStationAutoComplete.bind(this);
    this.handleToStationAutoComplete = this.handleToStationAutoComplete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {
    return (
      <div>
      <form>
        Reise fra: <input type="text" value={this.state.fromStationValue} onChange={this.handleFromStationChange} />
        <AutoCompleteField stations={this.state.autoCompleteFrom} handleFromStationAutoComplete={this.handleFromStationAutoComplete} />
        Reise til: <input type="text" value={this.state.toStationValue} onChange={this.handleToStationChange} />
        <AutoCompleteField stations={this.state.autoCompleteTo} handleFromStationAutoComplete={this.handleToStationAutoComplete} />
        Nå
        <input type="radio" name="departureTime" value="now" checked={true} />
        Avgang
        <input type="radio" name="departureTime" value="departure" />
        Ankomst
        <input type="radio" name="departureTime" value="arrival" />

        <button onClick={this.handleSearch} >Finn reise</button>
      </form>
      <TravelProposalDisplay proposals={this.state.TravelProposal} />
      </div>
    );
  }

  handleSearch(event) {
    event.preventDefault();
    //const url = `https://reisapi.ruter.no/Travel/GetTravels?fromPlace=${this.state.chosenFromStation}&toPlace=${this.state.chosenToStation}`;
    console.log(this.state.chosenFromStation, this.state.chosenToStation);

    fetch("https://reisapi.ruter.no/Travel/GetTravels?fromPlace=" + this.state.chosenFromStation + "&toPlace=" + this.state.chosenToStation + "&isafter=false")
      .then(result => result.json())
      .then(result => this.setState({TravelProposal: result}));
      
  }
  
  handleFromStationAutoComplete(event, stationID) {
    this.setState({fromStationValue: event.target.value, chosenFromStation: stationID});
  }

  handleToStationAutoComplete(event, stationID) {
    this.setState({toStationValue: event.target.value, chosenToStation: stationID});
  }

  handleFromStationChange(event) {
    this.setState({fromStationValue: event.target.value});
    
    fetch("https://reisapi.ruter.no/Place/GetPlaces/" + event.target.value)
      .then(result => result.json())
      .then(result => this.setState({autoCompleteFrom: result}));
    
  }

  handleToStationChange(event) {
    this.setState({toStationValue: event.target.value});

    fetch("https://reisapi.ruter.no/Place/GetPlaces/" + event.target.value)
    .then(result => result.json())
    .then(result => this.setState({autoCompleteTo: result}));
  }
}

class TravelProposalDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {DepartureTime: "", ArrivalTime: "", TotalTravelTime: ""};
  }

  render() {
    //console.log(this.props.proposals);
    //const test = this.props.proposals.map(proposal => (console.log("hva"))
    //
    //);

    return (
      <b></b>
    );
  }
}

class AutoCompleteField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {selectedStation: "5"};
  }

  render() {
    //Lager array fra stasjonene for å hindre feil når propen er tom
    const data = Array.from(this.props.stations)
    const stations = data.map(station => ( <option onClick={ (e) => this.handleChange(e, station.ID)}  > {station.Name} </option> ))
    return (
      <select size="5">
        {stations}
      </select>
    );
  }

  handleChange(event, id) {
    this.props.handleFromStationAutoComplete(event, id);
  }
}

class RuterApp extends Component {
  render() {
    return (
      <SearchBars />
    );
  }
}



class DepartureDisplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {departures: []}
  }
  
  componentDidMount() {
    fetch("https://reisapi.ruter.no/StopVisit/GetDepartures/3010650")
    .then(result => result.json())
    .then(result => this.display(result));
  }

  render() {
    return (
      <b>{this.state.departures.map( departure => {return <li>{departure}</li>} )}, hei</b>
    );
  }
  
  display(ruterJson) {
    for (let i = 0; i < 5; i++) {
      //console.log(ruterJson[i].MonitoredVehicleJourney);
      
      const linenumber = ruterJson[i].MonitoredVehicleJourney.LineRef;
      const destinationname = ruterJson[i].MonitoredVehicleJourney.DestinationName;
      
      const expectedarrival = new Date(ruterJson[i].MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime);
      const aimedarrival = new Date(ruterJson[i].MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime);
      const minutesDelayed =  Math.floor((expectedarrival - aimedarrival) / 60000);
      
      const departureArray = [linenumber, destinationname, expectedarrival.toString(), aimedarrival.toString(), minutesDelayed];
      this.setState({departures: departureArray});
      console.log(this.state.departures);

    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <SearchBar />
      <SearchBar />
      </div>
    );
  }
}

// https://reisapi.ruter.no/StopVisit/GetDepartures/3010011 all info fra jbt


//fetch("https://reisapi.ruter.no/StopVisit/GetDepartures/3010650")
//      .then(result => result.json())
//      .then(result => behandle(result));


export default App;
