import React, {Component} from 'react'
import ContactItem from './contact_item.js'
import ContactDetail from './contact_detail.js'
import ContactForm from './contact_form.js'


class Body extends Component {
  render() {
    switch (this.props.view) {
      case "view_all": {
        const contacts = this.props.contacts.map((contact, i) => {
          return ( <ContactItem 
            key={i} 
            contact={contact} 
            handleContactClick={() => {this.props.handleContactClick(contact)}}
            /> )
        })
        return ( 
          <ul className="list-group">{contacts}</ul>
        )
      }
      case "view": {
        return ( 
          <ContactDetail contact={this.props.selectedContact}
          /> 
        )
      }
      case "edit": {
        return ( 
          <ContactForm 
            contact={this.props.selectedContact}
            contacts={this.props.contacts} 
            view={this.props.view}
            handleContactUpdate={ (updatedContacts, newContact) => { 
              this.props.handleCreateOrUpdate(updatedContacts, newContact)
            } }
            handleContactDelete={ (updatedContacts) => this.props.handleContactDelete(updatedContacts) }
          /> 
        )
      }
      case "new": {
        return ( 
          <ContactForm 
            contact={{name:'', phone_number:'', job_title:'', address:'', email:''}} 
            contacts={this.props.contacts}
            view={this.props.view}
            handleContactCreate={ (updatedContacts, updatedContact) => { 
              this.props.handleCreateOrUpdate(updatedContacts, updatedContact)
            } }
          />
        )
      }
      default: {
        return ( <div>Contacts</div> )        
      }
    }
  }
}

export default Body