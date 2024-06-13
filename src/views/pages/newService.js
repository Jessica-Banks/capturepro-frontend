import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import ServiceAPI from './../../ServiceAPI'
import Toast from './../../Toast'

class newServiceView {
  init(){
    document.title = 'New Service'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newServiceSubmitHandler(e){
      e.preventDefault()    
      const submitBtn = document.querySelector('.submit-btn')
      submitBtn.setAttribute('loading', '')    
      const formData = new FormData(e.target)

      try{
        await ServiceAPI.newService(formData)
        Toast.show('Service added!')
        submitBtn.removeAttribute('loading')
        //reset form
        //reset text + textarea inputs
        const textInputs = document.querySelectorAll('sl-input, sl-textarea')
        if(textInputs) textInputs.forEach(textInput => textInput.value = null)
        //reset radio inputs
        const radioInputs = document.querySelectorAll('sl-radio-group')
        if(radioInputs) radioInputs.forEach(radioInput => radioInput.value = null)
          // reset file input
        const fileInput = document.querySelector('input[type=file]')
        if(fileInput) fileInput.value = null

      }catch(err){
        Toast.show(err, 'error')
        submitBtn.removeAttribute('loading')
      } 
  }

  render(){
    const template = html`
    <div class="page-content new">
      <va-app-header title="New Service" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content-top new-form">
        <h1>Add a Service</h1>
        <form class="page-form" @submit=${this.newServiceSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input name="name" type="text" placeholder="Service Name" required></sl-input>
          </div>
          <div class="input-group">              
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">$</span>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <sl-radio-group name="category" label="Category">
              <sl-radio value="wedding">Wedding</sl-radio>
              <sl-radio value="family">Family</sl-radio>
              <sl-radio value="commercial">Commercial</sl-radio>
              <sl-radio value="events">Events</sl-radio>
              <sl-radio value="sport">Sport</sl-radio>
              <sl-radio value="other">Other</sl-radio>
            </sl-radio-group>
          </div>
            <sl-button variant="primary" type="submit" class="submit-btn new-service-btn" style="size=large" pill>Add Service</sl-button>
        </form> 
     </div>
    `
    render(template, App.rootEl)
  }
}

export default new newServiceView()