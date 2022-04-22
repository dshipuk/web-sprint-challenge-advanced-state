import React from 'react'
import { connect } from 'react-redux'

export function Message(props) {
  return <div id="message">{props.infoMessage}</div>
}

const mapState = (s) => {
  return {
    infoMessage: s.infoMessage
  }
}

export default connect(mapState)(Message)
