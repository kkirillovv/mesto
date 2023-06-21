export class UserInfo {
  constructor(name, activity) {
    this.userName = name;
    this.userActivity = activity;
  };

  getUserInfo() {
    return {this:userName.textContent, this:userActivity.textContent}
  }

  setUserInfo({pname, activity}) {
    this.userName.textContent = pname;
    this.userActivity.textContent = activity;
  };
}