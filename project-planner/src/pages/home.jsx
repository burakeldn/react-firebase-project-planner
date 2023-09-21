import React, { Component } from 'react'
import SingleProject from '../components/signleProject'
import Navbar from '../components/navbar'
import FilterNav from '../components/filterNav'

export default class Home extends Component {

  updateProjects = (filteredProjects) => {
    console.log('Proje güncellendi:', filteredProjects);
  }

  render() {
    return (
      <div>
        PROJECT PLANNER
        <Navbar/>
        <FilterNav updateProjects={this.updateProjects} />
        <SingleProject />
      </div>
    )
  }
}
