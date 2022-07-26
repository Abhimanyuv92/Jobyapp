import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'


class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwtToken')
    const {history} = this.props
    history.push('/login')
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </div>
        <ul className="menu">
          <li className="menu-item">
            <Link to="/">Home</Link>
          </li>
          <li className="menu-item">
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
        <button
          type="button"
          onClick={this.onClickLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    )
  }
}

export default withRouter(Header)
