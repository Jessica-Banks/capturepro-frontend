import { LitElement, html, css } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-app-header', class AppHeader extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()    
  }

  navActiveLinks(){ 
    const currentPath = window.location.pathname
    const navLinks = document.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){   
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = document.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = document.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  createRenderRoot(){
    return this
  }

  render(){    
    return html`
    <style>      
      * {
        box-sizing: border-box;
      }

      .app-header {
        background-image: url('/images/header-bg.jpg');
        background-size: cover;
        background-position: center; 
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        color: #fff;
        display: flex;
        z-index: 9;
        box-shadow: 4px 0px 10px rgba(0,0,0,0.2);
        align-items: center;
      }
      
      .app-header-main {
        position: relative; 
        width: 100%;   
      }

      .app-header-main::slotted(h1){
        color: #fff;
      }

      .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;        
      }

      .app-logo img {
        width: 90px;
      }
      
      .hamburger-btn::part(base) {
        color: #fff;
      }

      .app-top-nav {
        position: fixed;
        display:flex;
        width: 95%;
        left: 50%;
        transform: translateX(-50%);
        top: 3%;
        padding: 3px;
        align-items: center;
        background-color: rgba(200, 210, 220, 0.35);
        border-radius: 100px;
        z-index: 10;
      }

      .app-top-nav a {
        display: inline-block;
        padding: .6em;
        text-decoration: none;
        color: #fff;
      }
      
      .app-side-menu-items a {
        display: block;
        padding: .5em;
        text-decoration: none;
        font-size: 1.3em;
        color: #333;
      }

      .app-side-menu-logo {
        width: 120px;
        margin-bottom: 1em;
        position: absolute;
        top: 2em;
        left: 1.5em;
      }

      .page-title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: var(--app-header-txt-color);
        margin-bottom: -1em;
        font-size: var(--app-header-title-font-size);     
        margin-top: -20px;
      }

      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
      }
    
      .hamburger-btn::part(base){
        display: none;
      }

      
      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        .app-top-nav {
          display: none;
        }
        .hamburger-btn::part(base){
          display: block;
          margin-left: 20px;
        }
      }
    </style>

    <header class="app-header">
      <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 1.5em;"></sl-icon-button>       
      <div class="app-header-main">
        ${this.title ? html`
          <h1 class="page-title">${this.title}</h1>
        `:``}
        <slot></slot>
      </div>
    </header>

      <nav class="app-top-nav">
        <a href="/" @click="${anchorRoute}">
          <img class="nav-logo" src="/images/logo.png"> 
        </a>
        <div class="nav-links">
          <a href="/services" @click="${anchorRoute}">Services</a>
          <a href="/photographers" @click="${anchorRoute}">Photographers</a>
          <a href="/favouriteServices" @click="${anchorRoute}">Favourites</a> 
        </div>       
        <sl-dropdown>
          <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
            <sl-avatar style="--size: 24px;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar> <span class="firstName">${this.user && this.user.firstName}</span>
          </a>
          <sl-menu>            
            <sl-menu-item @click="${() => gotoRoute('/profile')}">Profile</sl-menu-item>
            <sl-menu-item @click="${() => gotoRoute('/editProfile')}">Edit Profile</sl-menu-item>
            <sl-menu-item @click="${() => Auth.signOut()}">Sign Out</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </nav>
    
    <sl-drawer class="app-side-menu" placement="start" class="drawer">
      <img class="app-side-menu-logo" src="/images/logo.png">
      <nav class="app-side-menu-items">
        <a href="/" @click="${this.menuClick}">Home</a>
        <a href="/photographers" @click="${this.menuClick}">Find a Photographer</a>
        <a href="/services" @click="${this.menuClick}">Find a Service</a>
        <a href="/favouriteServices" @click="${this.menuClick}">Favourite Services</a>
        <a href="/profile" @click="${this.menuClick}">Profile</a>
        <a href="#" @click="${() => Auth.signOut()}">Sign Out</a>
      </nav>  
    </sl-drawer>
    `
  }
  
})
