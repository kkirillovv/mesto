export class UserInfo {
  constructor(avatar, name, activity) {
    this.userAvatar = avatar
    this.userName = name
    this.userActivity = activity
  }

  getUserInfo() {
    const avatar = this.userAvatar.style.backgroundImage
      .replace(/url\("/g, '').replace(/"\)/g, '')
    const name = this.userName.textContent
    const activity = this.userActivity.textContent
    return {avatar, name, activity}
  }

  setUserInfo({name, about}) {
    this.userName.textContent = name
    this.userActivity.textContent = about
  }

  setAvatar({avatar}) {
    this.userAvatar.style.backgroundImage = `url('${avatar}')`;
  }
}