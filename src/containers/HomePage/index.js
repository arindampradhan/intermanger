import { observer, inject } from "mobx-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import GroupList from '../../components/GroupList';
import GroupDetailView from '../../components/GroupDetailView'


@inject('home', 'user')
@observer
class HomePage extends Component {
  componentDidMount() {
    this.props.user.getUsers()
    this.props.home.getGroups()
  }


  render() {
    const { groups, setCurrentGroup, current_group, current_group_user_count, searchGroup, search_groups } = this.props.home
    return (
      <div className="main">
        <div className="row no-gutters">

          <div className="col-6 list-group">
            <form className="form-inline list-input">
              <input onChange={e => searchGroup(e.target.value)} className="form-control" type="text" placeholder="Search" />
            </form>
            {search_groups ?
              <>
                {search_groups.map((group, _id) => (
                  <div className="display-contents" onClick={() => setCurrentGroup(group)}>
                    <GroupList key={_id} group={group} />
                  </div>
                ))}
              </>
              : <div>Loading ...</div>}
          </div>
          {current_group ? (
            <div className="col-6 group-detail">
              <div className="profile">
                <div className="row padding-x-20 padding-t-50">
                  {current_group ? (
                    <div className="col-12">
                      <h2 className="text-white">{current_group.name} </h2>
                      <p className="text-white">{current_group.description}</p>
                      <h4 className="text-white">Users: {current_group_user_count}</h4>
                    </div>
                  ) : null}
                </div>
                <img src="/skyline-v1.svg" className="img-fluid" />
              </div>
              <div className="row">
                <div className="col-12">
                  <GroupDetailView />
                </div>
              </div>
            </div>
          ) : null}


        </div>
      </div>
    );
  }
}


export default HomePage
