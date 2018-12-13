import { observable, computed, action, runInAction } from "mobx";
import api from '../../api'
// import fuzzysearch from 'fuzzysearch';

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