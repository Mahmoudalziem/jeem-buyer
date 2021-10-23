import React, { Component } from 'react'

export class Spinner extends Component {

  render() {
    return (
      <div>
        <div className="spinner-wrapper" style={{ width:this.props.width ,height:this.props.height,position:'relative'}}>
          <div className="donut"></div>
        </div>
      </div>
    )
  }
}

export default Spinner
