import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import i18n from '../i18n/index'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const togglableVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      togglableVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={togglableVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={togglableVisibility}>{i18n.TOGGABLE.CANCEL_BUTTON}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
