import { observer, inject } from "mobx-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserList from '../../components/UserList'

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
    const { users, current_user, setCurrentUser, searchUser, search_users} = this.props.user;

    const user = current_user
    return (
      <div className="main">
        <div className="row no-gutters">

          <div className="col-6 list-group">
            <form className="form-inline list-input">
              <input onChange={e => searchUser(e.target.value)} className="form-control" type="text" placeholder="Search" />
            </form>
            {users ?(
              <>
                {search_users.map((item, _id) => (
                  <div className="display-contents" onClick={() => setCurrentUser(item)}>
                  <UserList key={item._id} user={item} />
                  </div>
                ))}
              </>
            ): null}
          </div>
          <div className="col-6 profile-detail">
            {user ? (
              <>
                <div className="profile">
                  <div className="row padding-x-20 padding-t-50">
                    <div className="col-12 text-center">
                      <img src={user.image} className="img-fluid rounded-circle" alt="Manager" />
                      <h2 className="text-white padding-t-20">{user.first_name} {user.last_name} </h2>
                    </div>
                  </div>
                </div>
                <div className="row no-gutters detail-overview">
                  <div className="col-12 paddding">
                    <p className="font-size-12">Bio: {user.bio}</p>
                    <div className="row user">
                      <div className="col-6">
                        First Name: {user.first_name}
                      </div>
                      <div className="col-6">
                        Last Name: {user.last_name}
                      </div>
                      <div className="col-6">
                        Email: {user.email}
                      </div>
                      <div className="col-6">
                        Phone: {user.phone}
                      </div>
                      <div className="col-6">
                        Profession: {user.profession}
                      </div>

                    </div>
                  </div>

                </div>
              </>
            ):null}
            
          </div>
        </div>
      </div>
    );
  }
}

export default UsersListView
