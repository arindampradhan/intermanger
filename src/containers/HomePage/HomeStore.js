import { observable, computed, action, decorate, runInAction } from "mobx";
import api from '../../api'
// import fuzzysearch from 'fuzzysearch'

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
