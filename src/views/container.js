import React, { Component } from "react";


const styles = {
  container : {
    // display: 'flex',
    // flex: 1,
    paddingRight: 200,
    paddingLeft: 200,
  }, 
}


class Container extends Component {
  render() {
    return (
      <div style={styles.container}>
          { this.props.children }
      </div>
    );
  }
}

export default Container;
