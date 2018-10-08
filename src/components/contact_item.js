import React from 'react'

const ContactItem = (props) => {
  return (
    <a href="#" className="list-group-item bg-dark border-top-0 border-left-0 border-right-0 border-secondary mb-0 rounded-0" onClick={ (e) => { e.preventDefault(); props.handleContactClick(e) } } >
      <h5 className="mb-0 text-capitalize text-light font-light">{props.contact.name}</h5>
      <p className="text-muted font-light mb-0">{props.contact.phone_number}</p>
    </a>
  )
}

export default ContactItem