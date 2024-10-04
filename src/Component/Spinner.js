import React, { Component } from 'react'
import Ripple from './Ripple.gif'

export default class Spinner extends Component {
  render() {
    return (
    <div className="text-center">
        <img src={Ripple} alt="Ripple" />
    </div>
    )
  }
}
