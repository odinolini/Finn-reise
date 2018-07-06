import React, { Component } from 'react';
import SearchBarWithAutocomplete from './components/Searchbar.js';
import Options from './components/Options.js';
import SearchResultDisplayer from './components/SearchResultDisplayer.js';
import './App.css';
import './bulma.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {fromStationId: '', toStationId: '', search: false, fromStationName: ''};
  }

  render() {
    return (
      <div className="container section">
        <div className="columns">
          <SearchBarWithAutocomplete handler={this.handleFromStationChange} placeholder={'Fra'} className="column searchbar" />
          <SearchBarWithAutocomplete handler={this.handleToStationChange} placeholder={'Til'} className="column searchbar" />
        </div>

        <div className="tile is-parent is-vertical is-6">
        <Options handler={this.handleOptions} isSearching={this.state.search}  className="tile" />
        <SearchResultDisplayer className="tile" searchOver={this.handleSearchOver} fromStationId={this.state.fromStationId} toStationId={this.state.toStationId} search={this.state.search} />
        </div>
      </div>
    );
  }

  handleFromStationChange = (id, name) => {
    this.setState({fromStationId: id, fromStationName: name});
  }

  handleToStationChange = (id) => {
    this.setState({toStationId: id});
  }

  handleOptions = (departureTime, event) => {
    event.preventDefault();
    if (this.state.toStationId && this.state.fromStationId) {
      this.setState({search: true});
    }
  }

  handleSearchOver = () => {
    this.setState({search: false});
  }
}



export default App;
