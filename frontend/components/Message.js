import React from "react";
import { connect } from "react-redux";

export function Message(props) {
  return <div id="message">{props.message}</div>;
}

const mapState = (s) => {
  return {
    message: s.infoMessage,
  };
};

export default connect(mapState)(Message);
