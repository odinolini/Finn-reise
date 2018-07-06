import React, { Component } from 'react';

export default class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {departureTime: 'now'};
    }

    render() {
        return (
        <form>
            <div className="control">
                <label className="radio">
                <input type="radio" name="departureTime" value="now" onChange={this.handleChange} checked={this.state.departureTime === 'now'} />
                Nå
                </label>
            </div>
            
            <div className="control">
                <label className="radio">
                <input type="radio" name="departureTime" value="departure" onChange={this.handleChange} checked={this.state.departureTime === 'departure'} />
                Avgang
                </label>
            </div>

            <div className="control">
                <label className="radio">
                <input type="radio" name="departureTime" value="arrival" onChange={this.handleChange} checked={this.state.departureTime === 'arrival'} />
                Ankomst
                </label>
            </div>
            
            <div className="control">
                <button className="button" disabled={this.props.isSearching}
                onClick={
                    (event) => this.props.handler(this.state.departureTime, event)
                }>
                    Finn reise
                </button>
            </div>
        </form>
        );
    }
    
    handleChange = (event) => {
        this.setState({departureTime: event.target.value})
    }
}