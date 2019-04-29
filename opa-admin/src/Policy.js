import React, { Component } from 'react';
import axios from 'axios'

const containerStyles = {
    display: "flex",
    marginTop: "50px",
    justifyContent: "center",
}

const titleStyles = {
   marginRight: "75px",
}

const buttonStylesOn = {
    border: "1px solid black",
    borderRadius: "5%",
    marginTop: "10px",
    color: "white",
    backgroundColor: "green"
}

const buttonStylesOff = {
    border: "1px solid black",
    borderRadius: "5%",
    marginTop: "10px",
    color: "white",
    backgroundColor: "red"
}

const codeStyles = {
    width: "600px",
    whiteSpace: "pre-wrap",
    textAlign: "left",
    padding: "10px",
    border: "1px solid black"
}

class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = {enabled: 'OFF'};
    }

    render () {
        return <div style={containerStyles} key={this.props.title}>
            <div style={titleStyles}>
                <div>{this.props.title}</div>
                {this.toggleButton()}
            </div>
            <div style={codeStyles}>{this.props.rawData}</div>
        </div>
    }

    toggleButton = () => {
        if (this.props.rawData) {
            return <div style={buttonStylesOn} onClick={this.offPolicy}>ACTIVE</div>
        }
        return <div style={buttonStylesOff} onClick={this.onPolicy}>INACTIVE</div>
    }

    onPolicy = () => {
        axios.create({baseURL: `http://0.0.0.0:8000/`})
            .get(this.props.title)
            .then(r => {
                axios.create({baseURL: `http://0.0.0.0:8181/v1/policies/`})
                    .put(this.props.title, r.data)
                    .then(() => this.props.refresh())
            })
    }

    offPolicy = () => {
        axios.create({baseURL: `http://0.0.0.0:8181/v1/policies/`})
            .delete(this.props.title)
            .then(() => this.props.refresh())
    }

    getPolicies = () => {
        const id = this.props.title.slice(0, this.props.title.length-5)
        axios.create(
            {baseURL: `http://0.0.0.0:8181/v1/policies/`},
            {headers: { 'content-type': 'application/json' }},
        )
        .get(id)
        .then(r => console.log("success: ", r))
        .catch(e => console.log("failure: ", e))

        this.setState((prevState, props) => ({enabled: true,}));
    }

    setEnabled = (enable) => {
        this.setState((prevState, props) => ({enabled: enable}))
    }
}

export default Policy;
