import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'
import ServiceAPI from './../../ServiceAPI'
import Toast from '../../Toast'

class ProfileView {
  async init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
    await this.getUserServices()
  }

  async getUserServices(){
    try{
      // Fetch all services
      this.services = await ServiceAPI.getServices();
      
      // Filter services based on the current user's ID
      this.services = this.services.filter(service => service.user._id === Auth.currentUser._id);
      console.log("Filtered services:", this.services);
      
      // Render the profile view with the filtered services
      this.render();
      } catch(err){
        // Handle error
        Toast.show(err, 'error');
        console.error("Error fetching user services:", err);
      }
  }

  render(){
    const template = html` <div class="page-content calign">  
      <va-app-header user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content-profile">
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar style="--size: 200px; margin-bottom: 1em; position: relative; z-index: 50;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em; position: relative; z-index: 50;"></sl-avatar>
        `}
        <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        ${Auth.currentUser.bio ? html`
          <p style="width: 60%; margin: 0 auto 30px auto;">${Auth.currentUser.bio}</p>
        ` : html``}
        <sl-button class="click-btn" @click=${()=> gotoRoute('/editProfile')} style="size=medium" pill>Edit Profile</sl-button>
        
        ${Auth.currentUser.accessLevel == 2 ? html`
             <h1 class="profile-title">Services</h1>
             
        <div class="services-grid profile-grid">        
          ${this.services == null ? html`
          <sl-spinner></sl-spinner>
          ` : html `
          ${this.services.map(service => html `
          <va-service class="service-card"
            id="${service._id}"
            name="${service.name}" 
            description="${service.description}"
            price="${service.price}"
            user="${JSON.stringify(service.user)}"
            image="${service.image}"
            category="${service.category}"
          >
          </va-service>
          `)}
        `}
        </div>

        <div class="add-service">
            <sl-button class="click-btn add-service-btn" @click=${()=> gotoRoute('/newService')} style="size=medium" pill>Add Service +</sl-button>
        </div>

        ` : ``}
      </div>    
    </div>

    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()