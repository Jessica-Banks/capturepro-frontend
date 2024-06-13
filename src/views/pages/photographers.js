import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'


class PhotographersView {
  init(){
    document.title = 'Photographers'
    this.photographers = null   
    this.render()    
    Utils.pageIntroAnim()
    this.getPhotographers()
  }

  async getPhotographers(){
    try{
      this.photographers= await UserAPI.getPhotographers()
      console.log(this.photographers)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }

    // Animating photographers
    const tlAnimate = gsap.timeline({
      scrollTrigger: {
        trigger: ".photographers-grid",
        start: "top 70%",
        end: "bottom 10%",
        toggleActions: "play none none none",
      },
    });
    //animate elements
    tlAnimate.from(".photographer-card", {opacity: 0, y: 100, duration: 2, stagger: 0.3});
  }

  render(){
    const template = html`
      <div class="page-content photographer-profile"> 
        <va-app-header title="Meet the Photographers" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
        <div class="photographers-grid">
          ${this.photographers == null ? html`
          <sl-spinner></sl-spinner>
          ` : html`
            ${this.photographers.map(photographer => html`
              <sl-card class="photographer-card">
                <img src="${App.apiBase}/images/${photographer.avatar}" alt="${photographer.firstName} ${photographer.lastName}"/>
                <h2>${photographer.firstName} ${photographer.lastName}</h2>
                <p>${photographer.bio}</p>
              </sl-card>
            `)}
          `}
        </div> 
      </div>      
      
    `
    render(template, App.rootEl)
  }
}


export default new PhotographersView()