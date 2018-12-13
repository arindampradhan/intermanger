import { observer, inject } from "mobx-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';
// gourp list view

// const user = {
//   "user_id": "dc02dee1-8fb6-48ba-b4bc-83e945e8dda4",
//   "first_name": "Worden",
//   "last_name": "Nyssen",
//   "email": "wnyssen1@fema.gov",
//   "phone": "700-654-6122",
//   "image": "https://robohash.org/veritatisdictavoluptas.bmp",
//   "profession": "Geologist IV",
//   "bio": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem."
// };

@inject('user','home')
@observer
class UsersListView extends Component {
  componentDidMount() {
    this.props.user.getUsers()
    this.props.home.getGroups()
  }

  render() {
    return (
      <div>Users</div>
    );
  }
}

export default UsersListView
