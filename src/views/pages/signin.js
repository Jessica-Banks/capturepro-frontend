import App from './../../App'
import {html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`      
    <div class="signinup-container">
      <div class="page-centered">
        <img class="signinup-logo" src="/images/logo-white.png"> 
        <div class="signinup-box">
          <h1 class="login-heading login-head">Login</h1>
          <form class="input-validation-required" @submit="${this.signInSubmitHandler}">          
            <div class="input-group">
              <sl-input class="input-field" label="Email" name="email" type="email" placeholder="Email" required></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="input-field" label="Password" name="password" type="password" placeholder="Password" required toggle-password></sl-input>
            </div>
            <sl-button type="submit" variant="primary" class="submit-btn" size="large" pill>Login</sl-button>
          </form>
          <p>Don't have an account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
        </div>
      </div>
      <div class="background">
        <img class="bg-img" src="images/stefan-stefancik-TPv9dh822VA-unsplash.jpg">
      </div>
    </div>
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()