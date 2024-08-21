const appBarContent = `
<p class="app-name">MathML</p>

`
export default class AppBar extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.className = "top-bar";
        this.style.display = "block";
        this.innerHTML = appBarContent;
    }
}

customElements.define("mf-app-bar", AppBar);