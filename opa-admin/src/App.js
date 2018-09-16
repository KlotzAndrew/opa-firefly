import React, { Component } from 'react';
import './App.css';

import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {policies: []};
  }

  componentWillMount() {
    this.getPolicies();
  }

  render() {
    return (
      <div className="App">
        { this.listPolicies() }
      </div>
    );
  }

  listPolicies = () => {
    var res = []
    this.state.policies.forEach(p => {
      res.push(<div key={p}>
        <div>{p}</div>
      </div>)
    })
    return res
  }

  getPolicies = () => {
    let axiosInstance = axios.create({baseURL: `http://0.0.0.0:8000`});

    axiosInstance
      .get("")
      .then(resp => {
        var regex = /\w+(.rego)/g;
        var found = resp.data.match(regex);

        let res = []
        found.forEach(p => {
          if (!p.includes("_test") && !res.includes(p)) {
            res.push(p)
          }
        })

        this.setState((prevState, props) => ({
          policies: res,
        }));
      })
  }
}

export default App;
