import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import React from 'react'

const ProtectedRoute = props => {
  if (Cookies.get('jwtToken') === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
