import { makeAutoObservable } from "mobx";

class AppState {
  userRoleId: null | number = null;
  userId: null | number = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUserRoleId(userRoleId: number) {
    this.userRoleId = userRoleId;
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  clearUser() {
    this.userId = null;
    this.userRoleId = null;
  }

  checkIsAuth() {
    return this.userId !== null;
  }

  checkIsAdmin() {
    return this.userRoleId === 1;
  }
}

export default new AppState();
