import { observable, computed, action, runInAction } from "mobx";
import api from '../../api'
import fuzzysearch from 'fuzzysearch';

class User {
  @observable users = [];
  @observable search_users = []
  @observable user_viewed = undefined
  @observable current_user = undefined

  @action setCurrentUser = (user) => {
    this.current_user = user;
  };

  @computed get users_count() {
    if (this.users && this.users.length) {
      return this.users.length
    }
    return 0
  }

  @action("SEARCH_USER")
  searchUser = (val) => {
    const u = this.users.filter(item => {
      return fuzzysearch(val.toLocaleLowerCase(), `${item.first_name} ${item.last_name}`.toLocaleLowerCase())
    })
    this.search_users = u
  }

  @action("GET_ACTIVE_USERS")
  getActiveUsers= (user_ids)=> {
    if (!user_ids) return []
    if(!this.users) return []
    return this.users.filter((u, _id) => {
      return user_ids.includes(u._id)
    })
  }

  @action("GET_NON_ACTIVE_USERS")
  getNonActiveUsers = (user_ids) => {
    if (!user_ids) return []
    if (!this.users) return []
    return this.users.filter((u, _id) => {
      return !user_ids.includes(u._id)
    })
  }

  @action('GET_USER')
  userViewed(_id) {
    return api.getUser(_id)
      .then(response => {
        runInAction(() => {
          this.user_viewed = response
        })
      })
  }

  @action("GET_USERS")
  getUsers() {
    return api.allUsers()
      .then(response => {
        if (response.docs) {
          runInAction(() => {
            this.users = response.docs;
            this.search_users = response.docs
          })
        }
      })
  }
}
export default User