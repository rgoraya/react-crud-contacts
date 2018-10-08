import React, {Component} from 'react'
import ProfilePicture from './profile_picture'
import DeleteConfirmation from './delete_confirmation'
import _ from 'lodash'
import $ from 'jquery'
import 'bootstrap/js/dist/modal';

class ContactForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      contact: props.contact,
      requestAttrs: this.buildRequestAttrs()
    }
  }
  
  render() {
    return (
      <div className="p-4">
        <form className="form-horizontal mb-4" id="contact_form" onSubmit={(e) => { this.handleSubmit(e) }}>
          <div className="mb-4 text-center">
            <ProfilePicture identifier={this.state.contact.email || "random"} />
            <input 
              className="form-control form-control-lg text-center mb-4 bg-dark border border-bottom text-light border-secondary rounded-0 border-top-0 border-left-0 border-right-0"
              value={this.state.contact.name} 
              name="name" placeholder="Name" type="text" data-required="true" autoFocus autoComplete="nope" onChange={(e)=>{ this.handleOnChange(e) }}
              onBlur={(e) => { this.validateInput(e.target.value, e.target.name) }} 
            />
            <div className="invalid-feedback"></div>
          </div>
          
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="border border-bottom text-muted input-group-text bg-dark border-secondary rounded-0 border-top-0 border-left-0 border-right-0"><span className="oi oi-phone align-bottom"></span></span>
            </div>
            <input 
              className="form-control bg-dark border border-bottom text-light border-secondary rounded-0 border-top-0 border-left-0 border-right-0"
              value={this.state.contact.phone_number}  
              name="phone_number" placeholder="Phone Number" type="text" data-required="true" autoComplete="nope"
              onChange={(e)=>{ this.handleOnChange(e) }}
              onBlur={(e) => { this.validateInput(e.target.value, e.target.name) }} 
            />
            <div className="invalid-feedback"></div>
          </div>
          
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="border border-bottom text-muted input-group-text bg-dark border-secondary rounded-0 border-top-0 border-left-0 border-right-0">
                <span className="oi oi-briefcase align-bottom"></span>
              </span>
            </div>
            <input 
              className="form-control bg-dark border border-bottom text-light border-secondary rounded-0 border-top-0 border-left-0 border-right-0"
              value={this.state.contact.job_title} 
              name="job_title" placeholder="Job Title" type="text" autoComplete="nope"
              onChange={(e)=>{ this.handleOnChange(e) }}
              onBlur={(e) => { this.validateInput(e.target.value, e.target.name) }} 
            />
            <div className="invalid-feedback"></div>
          </div>

          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="border border-bottom text-muted input-group-text bg-dark border-secondary rounded-0 border-top-0 border-left-0 border-right-0">
                <span className="oi oi-map-marker align-bottom"></span>
              </span>
            </div>
            <input 
              className="form-control bg-dark border border-bottom text-light border-secondary rounded-0 border-top-0 border-left-0 border-right-0"
              value={this.state.contact.address} 
              name="address" placeholder="Address" type="text" autoComplete="nope"
              onChange={(e)=>{ this.handleOnChange(e) }}
              onBlur={(e) => { this.validateInput(e.target.value, e.target.name) }} 
            />
            <div className="invalid-feedback"></div>
          </div>

          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="border border-bottom text-muted input-group-text bg-dark border-secondary rounded-0 border-top-0 border-left-0 border-right-0">
                <span className="oi oi-envelope-closed align-bottom"></span>
              </span>
            </div>
            <input 
              className="form-control bg-dark border border-bottom text-light border-secondary rounded-0 border-top-0 border-left-0 border-right-0"
              value={this.state.contact.email} 
              name="email" placeholder="Email" type="text"  data-required="true" autoComplete="nope"
              onChange={(e)=>{ this.handleOnChange(e) }} 
              onBlur={(e) => { this.validateInput(e.target.value, e.target.name) }}
            />
            <div className="invalid-feedback"></div>
          </div>
          <button type="submit" className="d-none">Submit</button>
        </form>
        
        {this.props.view === "edit" ? (
          <div className="mb-4 text-center">
          <button className="btn btn-link text-danger" data-toggle="modal" data-target="#deleteConfirmationModal">
            <span className="oi oi-trash mr-2"></span>
            Delete Contact
          </button>
          <DeleteConfirmation handleDelete={ (e) => this.handleDelete(e) }/>
        </div>  
        ) : (
          null
        )}
      </div>
    )
  }

  handleOnChange(e) {
    const property = e.target.name;
    const val = e.target.value;
    this.setState(
      prevState => (
        { contact: { ...prevState.contact, [`${property}`]: val} }
      )
    )
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.contactIsInvalid()) {
      return false;
    }

    fetch(this.state.requestAttrs.url, 
      {
        method: this.state.requestAttrs.method, 
        body: JSON.stringify({user_contact: this.state.contact}),
        headers:{
          'Content-Type': 'application/json'
        } 
    }).then(res => res.json())
      .then(
        response => {
          if (this.props.view === "new") {
            // prepend the new contact to contacts array
            this.props.contacts.unshift(response);
            // show newly created contact
            this.props.handleContactCreate(this.props.contacts, response);
          } else if (this.props.view === "edit") {
            // replace the updated contact on contacts array
            let index = this.props.contacts.findIndex((contact) => { return contact.id === response.id });
            this.props.contacts.splice(index, 1, response)
            // show updated contact's detail page
            this.props.handleContactUpdate(this.props.contacts, response);
          }
        }
      )
      .catch(error => console.error('Error:', error));
  }
  
  handleDelete(e) {
    e.preventDefault();

    fetch(this.state.requestAttrs.url, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp.status === 204) {
        // replace the updated contact on contacts array
        let index = this.props.contacts.findIndex((contact) => { return contact.id === this.state.contact.id });
        this.props.contacts.splice(index, 1)
        // hide the confirmation modal
        $('#deleteConfirmationModal').modal('hide');
        // show updated contact's detail page
        this.props.handleContactDelete(this.props.contacts);     
      }
    }).then(response => {
        console.log(response)
      })
      .catch(error => console.error('Error:', error))
  }

  contactIsInvalid() {
    let errors = [];
    
    _.each(this.state.contact, (value, name) => {
      if (name !== "id" && name!== "created_at" && name!== "updated_at") {
        let error = this.validateInput(value, name)
        if (error.length) {
            errors.push(error);
        }
      }
    });

    return errors.length > 0;
  }

  validateInput(value, name) {
    const $input = document.querySelector(`#contact_form input[name='${name}']`);
    let error  = "";
    let input_is_valid = true;

    // remove the error class at first
    $input.classList.remove('is-invalid'); 
    
    // check for empty when required
    if ($input.dataset.required === "true" && value === "") {
      input_is_valid = false;
      error = `Please Enter a ${name}`

    // check for valid phone numbers
    } else if ($input.name === 'phone_number') {
      let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (!re.test(value)) {
        input_is_valid = false;
        error = "Phone Number format is invalid";
      };
    
    // check for valid email format
    } else if ($input.name === 'email') {
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(value)) {
        input_is_valid = false;
        error = "Email format is invalid";
      };
    }

    // Mark the erronous fields as such 
    if (!input_is_valid && error.length) {
      $input.nextElementSibling.innerHTML = error;
      $input.classList.add('is-invalid');
    }
    return error;
  }

  buildRequestAttrs() {
    switch(this.props.view) {
      case "new":
        return {
          method: "POST",
          url: "https://www.ramindergoraya.com/api/v1/user_contacts"
        }
      case "edit":
        return {
          method: "PUT",
          url: `https://www.ramindergoraya.com/api/v1/user_contacts/${this.props.contact.id}`
        }
      default:
        return {
          method: "POST",
          url: "https://www.ramindergoraya.com/api/v1/user_contacts"
        }
    } 
  }
}

export default ContactForm