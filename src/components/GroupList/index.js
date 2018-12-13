import React, { Component } from "react";
import PropTypes from 'prop-types';
import api from '../../api';

class UserImg extends Component {
    state = {
        userImg: ''
    }
    componentDidMount() {
        api.getUser(this.props.user_id).then(user => {
            debugger
            this.setState({userImg: user.image})
        })
    }
    render() {
        return (
            <img src={this.state.userImg || '/manager.png'} alt="" className="img-fluid rounded-circle user--image"/>
        )
  }
}


export default function GroupList({ group,...props }) {
    let time = new Date().toDateString()
    if (group._id) {
        time = new Date(group._id).toDateString()
    }
    return (
        <div className="list">
            <h4 className="font-weight-light">{group.name}</h4>
            <span>Created at: {time}</span>
            {group.users_list_ids && group.users_list_ids.length ? (
                <div className="row padding-y-25">
                    <div className="col">
                        {group.users_list_ids.slice(0,6).map((user_id ,_id) => (
                            <UserImg user_id={user_id} />
                        ))}
                        <span className="font-size-24 padding-t-20">&nbsp;&nbsp;&nbsp;&nbsp;.... {group.users_list_ids.length}</span>
                    </div>
                </div>
            ):null }
        </div>
    )
}