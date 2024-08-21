import { topicsMap } from "../utils/topics.js";

export default class MainContent extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        const thisElement = this;
        this.container = document.createElement("div");
        this.container.className = "main-content-container";

        thisElement.className = "main-content";
        thisElement.appendChild(this.container)
        
        window.addEventListener("topicSelectEvent", topicSelectHandler);
        function topicSelectHandler(event){
            // const element = document.createElement(topicsMap[state.sideBox.topic.textContent]);
            // this.container.innerHTML = ""
            // thisElement.innerHTML = "";
            // thisElement.appendChild(element);
        }

        
    }

}


customElements.define("mf-main-content", MainContent)