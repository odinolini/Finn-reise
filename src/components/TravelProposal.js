import React, { Component } from 'react';
import LineButton from './LineButton.js';

export default class TravelProposal extends Component {
    render() {
        return (
            <div key={this.props.ArrivalTime} className="tile is-parent is-vertical">
                {this.props.DepartureStop ? <div className="tile is-child ">{this.formatDate(this.props.DepartureTime)} <span className="has-text-weight-semibold" >{this.props.DepartureStop.Name}</span></div> : ""} 


                {this.props.LineName ? <LineButton LineName={this.props.LineName} Destination={this.props.Destination} TransportationType={this.props.Transportation} /> : ""} 

                {this.props.ArrivalStop ? <div className="tile is child has-text-weight-semibold" >{this.formatDate(this.props.ArrivalTime)} {this.props.ArrivalStop.Name}</div> : ""} 



                {this.props.Transportation === 0 ? <div className="">Gå: {this.props.WalkingTime}</div> : ""}
                </div>
        );
    }

    formatDate(date, param) {
        const newDate = new Date(date);
        return newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    }
}
