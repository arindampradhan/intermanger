import { observer, inject } from "mobx-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';

@inject('home', 'user')
@observer
class HomePage extends Component {
  componentDidMount() {
    this.props.user.getUsers()
    this.props.home.getGroups()
  }

  render() {
    return (
      <div>
        Homepage
      </div>
    )
  }
}


export default HomePage
