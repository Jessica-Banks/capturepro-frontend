import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = new FormData(e.target)
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`    
    <div class="signinup-container">  
      <div class="page-centered">      
        <img class="signinup-logo" src="/images/logo-white.png"> 
        <div class="signinup-box signup-box">
          <h1 class="login-heading">Sign Up</h1>
          <form class="input-validation-required" @submit="${this.signUpSubmitHandler}">
            <div class="input-group">
              <sl-input class="input-field-signup" label="First Name" name="firstName" type="text" placeholder="First Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="input-field-signup" label="Last Name" name="lastName" type="text" placeholder="Last Name" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="input-field-signup" label="Email" name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="input-field-signup" label="Password" name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>  
            <div class="input-group" style="margin-top:12px;">
              <sl-select name="accessLevel" placeholder="I am a ...">
                <sl-option value="1">Customer</sl-option>
                <sl-option value="2">Photographer</sl-option>
              </sl-select>
            </div>          
            <sl-button variant="primary" type="submit" class="signup-btn submit-btn" size="large" pill>Create account</sl-button>
          </form>
          <p class="login-link">Already have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
        </div>
        <div class="background">
          <img class="bg-img" src="images/stefan-stefancik-TPv9dh822VA-unsplash.jpg">
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()