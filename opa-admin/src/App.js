import React, { Component } from 'react';
import './App.css';

import Policy from './Policy';

import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {policies: [], polcyData: {}};
  }

  componentWillMount() {
    this.getPolicies();
    this.getActivePolicies();
  }

  render() {
    return (
      <div className="App">
        { this.listPolicies() }
        { this.setState.polcyData }
      </div>
    );
  }

  listPolicies = () => {
    var res = [];
    this.state.policies.forEach(p => {
      const rawData = this.state.polcyData[p]
      res.push(<Policy
        key={p}
        title={p}
        rawData={rawData}
        refresh={this.getActivePolicies} />)
    })
    return res
  }

  getActivePolicies = () => {
    axios.create({baseURL: `http://0.0.0.0:8181/v1/policies`})
      .get()
      .then(r =>{
          let res = {}
          r.data.result.forEach(p => res[p.id] = p.raw)

          this.setState((prevState, props) => ({polcyData: res}));
      })
  }

  getPolicies = () => {
    axios.create({baseURL: `http://0.0.0.0:8000`})
      .get("")
      .then(resp => {
        var regex = /\w+(.rego)/g;
        var found = resp.data.match(regex);

        let res = []
        found.forEach(p => {
          if (!p.includes("_test") && !res.includes(p)) res.push(p);
        })

        this.setState((prevState, props) => ({policies: res}));
      })
  }
}

export default App;
