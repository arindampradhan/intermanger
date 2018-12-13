import { observer, inject } from "mobx-react";
import React, { Component } from "react";
import PropTypes from 'prop-types';
import GroupList from '../../components/GroupList';

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
                  <div className="display-contents" >
                    <GroupList key={_id} group={group} />
                  </div>
                ))}
              </>
              : <div>Loading ...</div>}
          </div>
          

        </div>
      </div>
    );
  }
}


export default HomePage
