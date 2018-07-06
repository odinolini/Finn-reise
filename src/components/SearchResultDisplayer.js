import React, { Component } from 'react';
import TravelProposal from './TravelProposal.js';

export default class SearchResultDisplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {travelProposal: []};
    }

    render() {
        if (this.props.search && this.props.fromStationId && this.props.toStationId) {
            this.getTravelProposal();
        }

        /* this.getTravelTest(); */



        let arr = this.state.travelProposal.length !== 0 ? this.state.travelProposal.TravelProposals.map( proposal => (
            <div key={proposal.ArrivalTime} className="tile is-ancestor is-vertical box travelProposal">
                {proposal.Stages.map( (stage, index) => 
                                <TravelProposal
                                key={index}
                                ArrivalTime={stage.ArrivalTime} 
                                Destination={stage.Destination}
                                DepartureStop={stage.DepartureStop}
                                DepartureTime={stage.DepartureTime}
                                LineName={stage.LineName}
                                ArrivalStop={stage.ArrivalStop}
                                Transportation={stage.Transportation}
                                WalkingTime={stage.WalkingTime}

                                />
                )}

            </div>
        )) : "";


        return (
            <main>
                {arr}
            </main>
        );
    }

    formatDate(date, param) {
        const newDate = new Date(date);
        return newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    }


    getTravelProposal() {
        fetch("https://reisapi.ruter.no/Travel/GetTravels?fromPlace=" + this.props.fromStationId + "&toPlace=" + this.props.toStationId + "&isafter=true")
        .then(result => result.json())
        .then(result => (this.setState({travelProposal: result}), console.log(result), this.props.searchOver()) );

    }

    getTravelTest() {
        fetch("https://reisapi.ruter.no/Travel/GetTravels?fromPlace=3010648&toPlace=2310300&isAfter=true")
        .then(result => result.json())
        .then(result => (this.setState({travelProposal: result}), console.log(result)) );
    }
}