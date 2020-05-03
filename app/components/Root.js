// @flow
import React, { Component } from 'react';
let { ipcRenderer, remote } = require("electron");

export default class Root extends Component<Props> {

  constructor() {
    super();

    // when process is done in the main process, it will send it back here in this renderer process
    ipcRenderer.on("createFolder-result", (event, args) => {
      if (args == true) {
        this.setState({ successMsg: "Success!" })
      } else {
        this.setState({ successMsg: "Failed." })
      }

    })
  }

  buttonClickHandler = async () => {

    // validation
    if (this.state.lastName == "" || this.state.firstName == "" || this.state.matter == "") {
      this.setState({successMsg: "Error: Please fill out all fields"});
      return;
    }

    this.setState({ successMsg: "Processing..." })
    let { lastName, firstName, matter } = this.state;

    // capitalize all variables
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    matter = matter.charAt(0).toUpperCase() + matter.slice(1);

    // send info to main process to process
    ipcRenderer.send("createFolders", { lastName, firstName, matter });
  }

  state = {
    lastName: "",
    firstName: "",
    matter: "",
    successMsg: ""
  }

  render() {
    return (
      <div className="fields">
        <label htmlFor="lastName">Last Name: </label>
        <input type="text" id="lastName" value={this.state.lastName} onChange={(e) => {
          // console.log(e.target.value);
          this.setState({ lastName: e.target.value });
        }} /><br />
        <label htmlFor="firstName">First Name: </label>
        <input type="text" id="firstName" value={this.state.firstName} onChange={(e) => {
          //console.log(e.target.value);
          this.setState({ firstName: e.target.value });
        }} /><br />
        <label htmlFor="matter">Matter: </label>
        <input type="text" id="matter" value={this.state.matter} onChange={(e) => {
          //console.log(e.target.value);
          this.setState({ matter: e.target.value });
        }} />
        <button onClick={this.buttonClickHandler.bind(this)}>Done</button>
        <div className="success-msg">{this.state.successMsg}</div>
        <button onClick={() => {
          this.setState({firstName: "", lastName: "", matter: ""});
        }}>Reset</button>
      </div>
    );
  }
}
