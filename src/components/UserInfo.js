export class UserInfo {
  constructor(name, activity) {
    this.userName = name
    this.userActivity = activity
  };

  getUserInfo() {
    const name = this.userName.textContent
    const activity = this.userActivity.textContent
    return {name, activity}
  }

  setUserInfo({pname, activity}) {
    this.userName.textContent = pname
    this.userActivity.textContent = activity
  };
}