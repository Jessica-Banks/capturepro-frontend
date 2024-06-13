import App from '../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import ServiceAPI from './../../ServiceAPI'
import Toast from '../../Toast'

class ServicesView {
  async init(){
    document.title = 'Services'
    this.services = null    
    this.render()    
    Utils.pageIntroAnim()
    await this.getServices()
    // this.filterServices ('category', 'Wedding')

    // Animating services
    const tlAnimate = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 70%",
        end: "bottom 10%",
        toggleActions: "play none none none",
      },
    });
    //animate elements
    tlAnimate.from(".service-card", {opacity: 0, y: 100, duration: 1.2, stagger: 0.2});

  }

  async filterServices(field, match){
    //validate
    if(!field || !match) return

    // get fresh copy of the services
    this.services = await ServiceAPI.getServices()

    let filteredServices

    //category
    if(field == 'category'){
      filteredServices = this.services.filter(service => service.category == match)
    }

    // render
    this.services = filteredServices
    this.render()

  }

  clearFilterBtns(){
    const filterBtns = document.querySelectorAll('.filter-btn')
    filterBtns.forEach(btn => btn.removeAttribute("variant"))
  }

  handleFilterBtn(e){
    // clear all filter buttons active
    this.clearFilterBtns()
    

    // set button active (type = primary)
    e.target.setAttribute("variant", "primary")
    // extract the field and match from the button
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")

    console.log("field = ", field)
    console.log("match = ", match)

    // filter haircuts
    this.filterServices(field, match)
  }

  clearFilters(){
    this.getServices()
    this.clearFilterBtns()
  }
  
  async getServices(){
    try{
      this.services = await ServiceAPI.getServices()
      console.log(this.services)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <style>
        .filter-menu{
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .filter-menu > div {
          margin-right: 1em;
        }
      </style>
    
    <div class="page-content">
      <va-app-header title="Services" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="filter-menu">
          <div>
          <h3 class="filter-btn underline-effect" size="small" @click=${this.clearFilters.bind(this)}>All</h3>
          <h3 class="filter-btn underline-effect" size="small" data-field="category" data-match="wedding" @click=${this.handleFilterBtn.bind(this)}>Wedding</h3>
          <h3 class="filter-btn underline-effect" size="small" data-field="category" data-match="family" @click=${this.handleFilterBtn.bind(this)}>Family</h3>
          <h3 class="filter-btn underline-effect" size="small" data-field="category" data-match="commercial" @click=${this.handleFilterBtn.bind(this)}>Commercial</h3>
          <h3 class="filter-btn underline-effect" size="small" data-field="category" data-match="events" @click=${this.handleFilterBtn.bind(this)}>Events</h3>
          <h3 class="filter-btn underline-effect" size="small" data-field="category" data-match="sport" @click=${this.handleFilterBtn.bind(this)}>Sport</h3>
          <h3 class="filter-btn underline-effect" size="small" data-field="category" data-match="other" @click=${this.handleFilterBtn.bind(this)}>Other</h3>
          </div>
      </div>

      <div class="services-grid">        
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
    </div>      
    
    `
    render(template, App.rootEl)
  }
}


export default new ServicesView()