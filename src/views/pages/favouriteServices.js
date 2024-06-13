import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class FavouriteServicesView {
  init(){
    document.title = 'Favourite Services'
    this.favServices = null    
    this.render()    
    Utils.pageIntroAnim()
    this.getFavServices()
  }

  async getFavServices(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favServices = currentUser.favouriteServices
      console.log(this.favServices)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  render(){
    const template = html`<div class="page-content">     
      <va-app-header title="Favourites" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content-top">         
        <div class="services-grid">
          ${this.favServices == null ? html`
          <sl-spinner></sl-spinner>
         ` : html`
          ${this.favServices.map(service => html`
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
      </div>    
    </div>  

    `
    render(template, App.rootEl)
  }
}

export default new FavouriteServicesView()