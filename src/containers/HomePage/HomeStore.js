import { observable, computed, action, decorate, runInAction } from "mobx";
import api from '../../api'
import fuzzysearch from 'fuzzysearch'

export default class Home {
  @observable groups = [];
  @observable search_groups = []
  @observable current_group = undefined;
  @observable current_group_users = []

  @computed get groups_count() {
    if(this.groups && this.groups.length) {
      return this.groups.length
    }
    return 0
  }

  @computed get current_group_user_count() {
    if(this.current_group && this.current_group.users_list_ids) {
      return this.current_group.users_list_ids.length
    } 
    return 0
  }

  @action("ADD_USER")
  assignUserToGroup(user, group) {
    return api.assignUserToGroup(user,group).then((response) => {
      runInAction(() => {
        this.getUsers()
      })
    }).catch(err => {
      console.log(err.message)
    })
  }
  @action("REMOVE_USER")
  removeUserFromGroup(user, group) {
    return api.removeUserFromGroup(user, group).then(() => {
      runInAction(() => {
        this.getUsers()
      })
    }).catch(err => {
      console.log(err.message)
    })
  }

  @action("IS_ACTIVE_USER")
  isActiveUser(user, group) {
    if (group && group.users_list_ids && user) {
      return group.users_list_ids.includes(user._id)
    }
    return undefined
  }


  @action("SEARCH_GROUP")
  searchGroup = (val) => {
    const u = this.groups.filter(item => {
      return fuzzysearch(val.toLocaleLowerCase(), item.name.toLocaleLowerCase())
    })
    this.search_groups = u
  }

  @action setCurrentGroup = (group) => {
    this.current_group = group;
  };

  @action("GET_GROUPS")
  getGroups() {
    api.allGroups()
      .then(response => {
        if (response.docs) {
          runInAction(() => {
            this.groups = response.docs;
            this.search_groups = response.docs;
          })
        }
      })
  }
}
