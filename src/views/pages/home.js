import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
 
    // Animating photographers
    const tlAnimate = gsap.timeline({
      scrollTrigger: {
        trigger: ".page-content",
        start: "top 70%",
        end: "bottom 10%",
        toggleActions: "play none none none",
      },
    });
    //animate elements
    tlAnimate.from(".home-img", {opacity: 0, y: 100, duration: 2, stagger: 0.25});
  }

  render(){
    const template = html`
      <div class="page-content  home">
        <va-app-header user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
        <div class="home-anim">
          <img class="home-img image-1" src="/images/deanna-alys-6LBBOwkPzyQ-unsplash.jpg" alt="lotion">
          <img class="home-img image-2" src="/images/narissa-de-villiers-NHparE4bO80-unsplash.jpg" alt="man covering eyes">
          <img class="home-img image-3" src="/images/carly-osborn-LKRRLAKgeO4-unsplash.jpg" alt="group of people walking">
          <img class="home-img image-4" src="/images/ayo-ogunseinde-UqT55tGBqzI-unsplash.jpg" alt="greyscale woman">
          <img class="home-img image-5" src="/images/good-faces-xmSWVeGEnJw-unsplash.jpg" alt="woman">
          <img class="home-img image-6" src="/images/jakob-owens-mLIurLmSRAY-unsplash.jpg" alt="wedding">
        </div>

        <div class="page-content-home calign">
          <h1>Welcome, ${Auth.currentUser.firstName}</h1>
          <sl-button class="homeBtn"  @click=${() => gotoRoute('/services')}> Find a Photography Service 
          <span class="arrow" slot="suffix"><sl-icon name="arrow-right"></sl-icon></span>
          </sl-button>
        </div>
      </div>
     
      <style>
        .page-content-home{
          margin-top: calc(var(--app-header-height) + 5vh);
        }
      </style>
      
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()