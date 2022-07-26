import React,{Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class ProfileDetails extends Component {
  state = {
    name: '',
    profileImageUrl: '',
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const profileDetails = data.profile_details
    const {name} = profileDetails
    const profileImageUrl = profileDetails.profile_image_url
    this.setState({name, profileImageUrl})
  }

  render() {
    const {name, profileImageUrl} = this.state
    return (
      <div className="profile-details">
        <img src={profileImageUrl} alt="profile" />
        <div className="name">Abhimanyu</div>
        <div className="bio"> Lead Software Developer</div>
      </div>
    )
  }
}

export default ProfileDetails
