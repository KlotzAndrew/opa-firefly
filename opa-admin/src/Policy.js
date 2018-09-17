import React, { Component } from 'react';

import axios from 'axios'

class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = {enabled: 'OFF'};
    }

    // white-space: pre-line;
    render () {
        return <div key={this.props.title}>
            <div>{this.props.title}</div>
            { this.toggleButton() }
            {this.props.rawData }
        </div>
    }

    toggleButton = () => {
        if (this.props.rawData) {
            return <div onClick={this.offPolicy}>TURN OFF</div>
        }
        return <div onClick={this.onPolicy}>TURN ON</div>
    }

    onPolicy = () => {
        axios.create({baseURL: `http://0.0.0.0:8000/`})
            .get(this.props.title)
            .then(r => {
                axios.create({baseURL: `http://0.0.0.0:8100/v1/policies/`})
                    .put(this.props.title, r.data)
            })
    }

    offPolicy = () => {
        axios.create({baseURL: `http://0.0.0.0:8100/v1/policies/`})
            .delete(this.props.title)
    }

    getPolicies = () => {
        const id = this.props.title.slice(0, this.props.title.length-5)
        console.log("getting...", id)
        axios.create(
            {baseURL: `http://0.0.0.0:8181/v1/policies/`},
            {headers: { 'content-type': 'application/json' }},
        )
        .get(id)
        .then(r => {
                console.log("success: ", r)
            }
        )
        .catch(e =>{
            console.log("failure: ", e)
        })

        this.setState((prevState, props) => ({enabled: true,}));
    }

    setEnabled = (enable) => {
        this.setState((prevState, props) => ({enabled: enable}))
    }
}

export default Policy;
