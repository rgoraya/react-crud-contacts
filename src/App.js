import React, { Component } from 'react';
import './App.css';
import Header from './components/header.js'
import Body from './components/body.js'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {

      contacts: [],
      view: "view_all",
      selectedContact: {},
      loading: true
    }
  }

  componentDidMount() {
    fetch('https://www.ramindergoraya.com/api/v1/user_contacts.json')
    .then((contacts) => 
      contacts.json()
    ).then((contacts) => {
      this.setState({ contacts: contacts, loading: false });
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="row">
        <div className="col-md-4 mx-auto bg-dark text-light p-0 card">
          <div className="card-header shadow"> 
            <Header 
              view={this.state.view}
              selectedContact={this.state.selectedContact}
              onHeaderViewChange={ view => {this.setState({view})} }
              handleSearch={ searchStr => {this.searchContacts(searchStr)} } 
            />
          </div>
          <div className="card-body px-0 pb-0">
            {this.state.contacts.length ? (
              <Body 
                view={this.state.view} 
                contacts={this.state.contacts} 
                selectedContact={this.state.selectedContact}
                handleContactClick={ selectedContact => { this.setState({selectedContact, view: "view"})}}
                handleContactDelete={ contacts => this.setState({ contacts, view: "view_all" })}
                handleCreateOrUpdate={ (contacts, selectedContact) => this.setState({ contacts, selectedContact, view: "view" })}
              />
              ) : ( 
                <div className="p-4 text-center">
                  {this.state.loading ? "Loading..." : "No contacts found"}
                </div>
              )
            }
          </div>
          <div className="card-footer text-muted text-center">
            <small>
              A React JS App on a Rails site
            </small>
          </div>
        </div>
      </div>
    )
  } 
    
  searchContacts(searchStr) {
    this.setState({loading: true})
    fetch(`https://www.ramindergoraya.com/api/v1/user_contacts.json?search=${searchStr}`)
    .then((contacts) => 
      contacts.json()
    ).then((contacts) => {
      this.setState({ contacts: contacts, loading: false });
    })    
  }
}

export default App;
