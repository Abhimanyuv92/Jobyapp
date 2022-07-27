import React,{Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: 'rahul', password: 'rahul@2021', errorText: '', showLoginError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    // console.log(response)
    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwtToken', jwtToken, {expires: 30})
    const {history} = this.props
    history.push('/')
  }

  onLoginFailure = errorText => {
    this.setState({errorText, showLoginError: true})
  }

  render() {
    const {showLoginError} = this.state
    const jwtToken = Cookies.get('jwtToken')
    const renderErrorMessage = () => {
      const {errorText} = this.state
      console.log('rendered error message')
      return <p className="error-text">*{errorText}</p>
    }
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <form onSubmit={this.onClickLogin} className="login-form">
          <div className="image">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <p>USERNAME</p>
          <input
            type="text"
            onChange={this.onChangeUsername}
            placeholder="Username"
            defaultValue='rahul'
          />
          <p>PASSWORD</p>
          <input
            type="password"
            onChange={this.onChangePassword}
            placeholder="Password"
            defaultValue='rahul@2021'
          />
          <p>
            <button type="submit" className="login-button">
              Login
            </button>
          </p>
          {showLoginError && renderErrorMessage()}
        </form>
      </div>
    )
  }
}

export default Login
