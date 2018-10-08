import React from 'react'

const ProfilePicture = (props) => {
  const imgUrl = `https://api.adorable.io/avatars/400/${props.identifier}`
  return (
    <div className="w-50 h-50 mb-4 mx-auto profile-picture-container">
      <img className="rounded-circle img-fluid" src={imgUrl} alt="profile"/>
    </div>
  )
}

export default ProfilePicture