import React, { PropTypes } from 'react'
import { container } from './styles.css'

export default function Main (props) {
  return (
      <div className={container}>
        <img src={require('./../../images/logo_Praiera_transp.png')} />
      </div>
  )
}