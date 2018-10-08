import React from 'react'
import ProfilePicture from './profile_picture.js'

const ContactDetail = (props) => {
  return (
    <div className="p-4">
      <div className="mb-4 text-center">
        <ProfilePicture identifier={props.contact.email} />
        <h3 className="font-light mb-4">{props.contact.name}</h3>
      </div>
      <div className="position-relative">
        <span className="oi oi-phone text-muted mr-3 align-middle pt-1 position-absolute"></span>
        <p className="font-light ml-4 pl-1">{props.contact.phone_number}</p>
      </div>
      <div className="position-relative">
        <span className="oi oi-briefcase text-muted mr-3 align-middle pt-1 position-absolute"></span>
        <p className="font-light ml-4 pl-1">{props.contact.job_title}</p>
      </div>
      <div className="position-relative">
        <span className="oi oi-map-marker text-muted mr-3 align-middle pt-1 position-absolute"></span>
        <p className="font-light ml-4 pl-1">{props.contact.address}</p>
      </div>
      <div className="position-relative">
        <span className="oi oi-envelope-closed text-muted mr-3 align-middle pt-1 position-absolute"></span>
        <p className="font-light ml-4 mb-4 pl-1">{props.contact.email}</p>
      </div>
    </div>
  );
}

export default ContactDetail
