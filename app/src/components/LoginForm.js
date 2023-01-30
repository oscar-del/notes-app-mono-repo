import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

export default function LoginForm (props) {
  return (
    <Togglable buttonLabel='Show Login'>
      <form onSubmit={props.handleSubmit}>
        <div>
          <input
            type='text'
            value={props.username}
            name='username'
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={props.password}
            name='password'
            onChange={props.handlePasswordChange}
          />
        </div>
        <button id='form-login-button'>
          login
        </button>
      </form>
    </Togglable>
  )
}

LoginForm.prototype = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string
}
