import { makeAutoObservable } from "mobx";

class AppState {
  userRole: null | string = null;
  userId: null | string = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUserRole(userRole: string) {
    this.userRole = userRole;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }
}

export default new AppState();
