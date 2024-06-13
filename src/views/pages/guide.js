import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  async updateCurrentUser(){
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }

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
    tlAnimate.from(".guide-img", {opacity: 0, y: 100, duration: 2, stagger: 0.25});
  }

  render(){
    const template = html`
    <div class="page-content  guide">
      <va-app-header user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="guide-anim">
        <img class="guide-img image-1" src="/images/deanna-alys-6LBBOwkPzyQ-unsplash.jpg" alt="lotion">
        <img class="guide-img image-2" src="/images/narissa-de-villiers-NHparE4bO80-unsplash.jpg" alt="man covering eyes">
        <img class="guide-img image-3" src="/images/carly-osborn-LKRRLAKgeO4-unsplash.jpg" alt="group of people walking">
        <img class="guide-img image-4" src="/images/ayo-ogunseinde-UqT55tGBqzI-unsplash.jpg" alt="greyscale woman">
        <img class="guide-img image-5" src="/images/good-faces-xmSWVeGEnJw-unsplash.jpg" alt="woman">
        <img class="guide-img image-7" src="/images/jakob-owens-mLIurLmSRAY-unsplash.jpg" alt="wedding"> 
        <img class="guide-img image-8" src="/images/zulian-firmansyah-OtA0oPdyIXM-unsplash.jpg" alt="perfume"> 
      </div>
      <div class="page-content-guide calign">
        <h1>Welcome, ${Auth.currentUser.firstName}</h1>
        <div class="tour">This is a quick tour to teach you the basics of using CapturePro</div>
          <div class="arrow"><sl-icon name="arrow-down"></sl-icon></div>
        </div>
     
        <div class="guide-container calign">
          <div class="guide-step">
            <h4 class="animate__animated animate__fadeInUp animate__delay-1.9s">Search Photographers</h4>
            <img class="animate__animated animate__fadeInUp animate__delay-1.9s" src="/images/photographers.png">
          </div>

          <div class="guide-step">
            <h4>Find a service</h4>
            <img class="animate__animated animate__fadeInUp animate__delay-1.9s" src="/images/services.png">
          </div>

          <div class="guide-step">
            <h4>Save services to favourites</h4>
            <img class="animate__animated animate__fadeInUp animate__delay-1.9s" src="/images/favourites.png">
          </div>

          <sl-button variant="primary" class="click-btn" style="margin-top: 40px; margin-bottom: 60px;" size=large pill @click=${() => gotoRoute('/services')}>Okay got it!</sl-button>
        </div>   
      </div>
    </div>
         
    `
    render(template, App.rootEl)
  }
}

export default new GuideView()