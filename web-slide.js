class Slide extends HTMLElement {

    connectedCallback() {
        let img = this.getAttribute('data-img')
  
        this.innerHTML = `
            <img src="${img}" alt="" ></img>
        `
    }
  
  }
  
  customElements.define("web-slide", Slide);