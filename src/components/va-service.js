import { LitElement, html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from './../UserAPI'
import Toast from './../Toast'

customElements.define('va-service', class Service extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String
      },
      category: {
        type: String
      }   
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  async moreInfoHandler(){
    // create sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    // add className
    dialogEl.className = 'service-dialog'
    // sl-dialog content 
    const dialogContent = html`
    <style>
      .wrap {
        display: flex;
      }
      .image img {
        width: 500px;
      }
      .content {
        padding-left: 4em;
        margin-top: 20px;
      }
      .description{
        margin-bottom: 30px;
      }
      .price{
        font-size: 1.5em;
        color: var(--brand-color)
      }

      @media all and (max-width: 768px) {
        .wrap {
          display: flex;
        }
        .image img {
          width: 90%;
        }
        .content {
          padding-left: 1.1em;
          margin-top: 20px;
        }   
        .description{
          margin-bottom: 20px;
          font-size: 0.7em;
        }
        .price{
          font-size: 1em;
          color: var(--brand-color)
        }
        h1{
          font-size: 1.4em;
        }
      }
        
      @media all and (max-width: 2000px){
        .content {
          padding-left: 1.1em;
          padding-right: 1.3em;
        }
        .image img {
          width: 100%;
        }
      }

      @media all and (max-width: 640px) {
        .content {
          padding-left: 1.4em;
          padding-right: 1.3em;
        }
        .image{
        width: 75%;
        }
      }

      @media all and (max-width: 768px) {
        .wrap {
          flex-direction: column;
        }
        .image {
          width: 100%;
        }
      }

      @media all and (min-width: 769px) {
        .wrap {
          display: flex;
          flex-direction: row;
        }
        .image {
          width: 40%; 
        }
        .content {
          width: 60%; /* Adjust width as needed */
          padding-left: 1.4em;
          padding-right: 1.3em;
        }
        .description{
          width: 100%;
        }
      }
    </style>

      <div class="wrap">
        <div class="image">
          <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
        </div>
        <div class="content">
          <h1>${this.name}</h1>
          <p class="author">By ${this.user.firstName} ${this.user.lastName}</p>
          <p class="price">$${this.price}</p>
          <p class="description">${this.description}</p>
      
          <sl-button class="click-btn" @click=${this.bookServiceHandler.bind(this)} pill>
            <sl-icon slot="prefix" name="calendar"></sl-icon>
            Request Booking
          </sl-button>

          <sl-button class="click-btn add-fav-btn" @click=${this.addFavHandler.bind(this)} pill>
            <sl-icon slot="prefix" name="heart-fill"></sl-icon>
            Add to Favourites
          </sl-button>
        </div>
      </div>
    `
    render(dialogContent, dialogEl)

    // append to document.body
   await document.body.append(dialogEl)

    //show sl-dialog
    dialogEl.show()
    
    // on hide delete dialogEl
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })
  }

  async addFavHandler(){    
    try {
      await UserAPI.addFavService(this.id)
      Toast.show('Service added to favourites')
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  
  async bookServiceHandler() {
    const bookingDialogEl = document.createElement('sl-dialog');
    bookingDialogEl.className = 'booking-dialog';
    

  
    const bookingFormContent = html`
      <style>
        .form {
          display: flex;
          flex-direction: column;
          gap: 1em;
          padding: 1em 5em 5em 5em;
        }
        .name-fields, .contact-fields, .date-time {
        display: flex;
        gap: 1em; /* Space between first and last name inputs */
      }
      sl-input, sl-textarea {
        flex: 1; /* Make inputs take full width of the container */
        min-width: 0; /* Allow inputs to be narrower if necessary */
      }
      sl-button {
        align-self: flex-start; /* Align button to the left, or you can use 'center' for centering */
        margin-top: 20px;
      }
      h2{
        margin-left: 3em;
      }
      </style>
      <h2>Book ${this.name}</h2>
      <form class="form" @submit=${this.closeBookingDialog.bind(this, bookingDialogEl)}>
      <div class="name-fields">
        <sl-input label="First Name" name="firstName" required></sl-input>
        <sl-input label="Last Name" name="lastName" required></sl-input>
      </div>
      <div class="contact-fields">
        <sl-input type="email" label="Your Email" name="email" required></sl-input>
        <sl-input type="tel" label="Your Phone Number" name="phone"></sl-input>
      </div>
      <div class="date-time">
        <sl-input type="date" label="Booking Date" name="date" required></sl-input>
        <sl-input type="time" label="Preferred Time" name="time" required></sl-input>
      </div>
      <sl-textarea label="Message" name="message" placeholder="Any additional information..."></sl-textarea>
      <sl-button class="click-btn" type="submit" pill>Request Booking</sl-button>
    </form>
    `;
    render(bookingFormContent, bookingDialogEl);

    await document.body.append(bookingDialogEl);
    bookingDialogEl.show();

    bookingDialogEl.addEventListener('sl-after-hide', () => {
      bookingDialogEl.remove();
    });
  }

  closeBookingDialog(dialogEl, event) {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const date = formData.get('date');
    const time = formData.get('time');
  
    // Check if all required fields are filled
    if (firstName && lastName && email && date && time) {
      // Perform your booking request logic here
  
      Toast.show('Booking requested!'); // Show confirmation message
      dialogEl.hide(); // Close the dialog
    } else {
      Toast.show('Please fill out all required fields.', 'error'); // Show error message
    }
  }
  
  render(){    
    return html`
    <style>
      .author{
        font-size:0.9em;
        font-style: italic;
        opacity: 0.8;
      }
      .service-name{
        font-size: 1.2em;
        font-weight: 400;
        margin-top: -10px;  
      }
      .price-amount, .author{
        font-weight: var(--base-font-weight);
        margin-top: -10px;
        font-size: 0.9em;
      }

      @media all and (max-width: 768px) {
        .author {
          font-size: 0.6em;
        }
        .service-name {
          font-size: 0.9em;
        }
        .price-amount,
        .author {
          font-size: 0.6em;
        }
      }
    </style>

    <sl-card>
        <img slot="image" src="${App.apiBase}/images/${this.image}" />
        <h2 class="service-name">${this.name}</h2>
        <h3 class="price-amount">$${this.price}</h3>
        <p class="author">By ${this.user.firstName} ${this.user.lastName}</p>
        <sl-button @click=${this.moreInfoHandler.bind(this)} pill>More Info</sl-button>
        <sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}></sl-icon-button>
    </sl-card>
    `
  }
  
})

