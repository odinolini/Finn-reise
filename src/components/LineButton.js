import React, { Component } from 'react';

export default class LineButton extends Component {
    render() {
        let transporttype;
        if (this.props.TransportationType === 2) {
            transporttype = "directions_bus";
        } else if (this.props.TransportationType === 6) {
            transporttype = "directions_railway";
        } else if (this.props.TransportationType === 7) {
            transporttype = "tram";
        } else if (this.props.TransportationType === 8) {
            transporttype = "directions_subway";
        } else if (this.props.TransportationType === 5) {
            transporttype = "directions_boat";
        }

        return (
            <div className="level linjeContainer">
                <div className="level-left">
                    <span className="LinjeButtonStrek has-background-warning level-item" ></span>

                    <div className="level-item has-background-danger has-text-light linje">
                        
                        <span className="icon"><i className="material-icons">{transporttype}</i></span>
                        {this.props.LineName} {this.props.Destination}
                        
                    </div>
                </div>
            </div>
        );
    }
}