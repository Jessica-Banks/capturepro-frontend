import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
    this.user = null
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()    
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async updateProfileSubmitHandler(e){
    e.preventDefault()
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')
    try {
      const formData = new FormData(e.target)
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('profile updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }

  render(){
    const template = html`<div class="page-content edit-profile">
      <va-app-header title="Edit Profile" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
        <div class="page-content-edit">     
          ${(this.user == null) ? html`
            <sl-spinner></sl-spinner>
          `:html`
          <div class="edit-box">
            <form class="page-form input-validation-required" @submit=${this.updateProfileSubmitHandler.bind(this)}>
              <h1>My Account</h1>  
              <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>
              <div class="input-group">
                <sl-input type="text" name="firstName" value="${this.user.firstName}" placeholder="First Name"></sl-input>
              </div>
              <div class="input-group">
                <sl-input type="text" name="lastName" value="${this.user.lastName}" placeholder="Last Name"></sl-input>
              </div>
              <div class="input-group">
                <sl-input type="text" name="email" value="${this.user.email}" placeholder="Email Address"></sl-input>
              </div>
              <div class="input-group">
                <sl-textarea name="bio" rows="4" value="${this.user.bio}" placeholder="Bio"></sl-textarea>
              </div>             
              <div class="input-group">
                <label>Avatar</label><br>          
                  ${(this.user.avatar) ? html`
                <sl-avatar image="${App.apiBase}/images/${this.user.avatar}"></sl-avatar>
                <input type="file" name="avatar" />
                 `: html`
                  <input type="file" name="avatar" />
                `}
              </div>
              <sl-button variant="primary" type="submit" class="submit-btn" style="width: 60%;" size="large" pill>Update Account</sl-button>
            </form>
          </div>
            <div class="background">
              <img class="bg-img" src="images/stefan-stefancik-TPv9dh822VA-unsplash.jpg">
            </div>
          `}
        </div>
    </div>
    
    `
    render(template, App.rootEl)
  }
}

export default new EditProfileView()