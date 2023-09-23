import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class navbar extends Component {
  render() {
    return ( 
      <div>
        <Link to ="/">
          <button className='button' >Projects</button>
        </Link>
      <Link to="/addproject">
        <button className='button' >Add Project</button>
      </Link>
    </div>
    )
  }
}
