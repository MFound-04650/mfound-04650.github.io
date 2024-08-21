import { isTouchEvent } from "../utils/events.js";
import fetchData from "../utils/data.js";
import { topicsMap } from "../utils/topics.js";

const sideBoxContent = `

`;

const allTopics = [
    {"Systems of Linear Equations and Matrices": ["System of Linear Equations", "Matrices"]},
    {"Solving Systems of Linear Equations": []},
    {"Linear Independence, Basis and Rank":[]},
    {"Linear Mappings and Affine Spaces":[]},
    {"Orthogonality": []},
    {"Determinant and Trace": []},
    {"Eigenvalues and Eigenvectors": []},
    {"Eigendecomposition and Diagonalization": []},
    {"Singular Value Decomposition": []},
    {"Symmetric Matrix": []},
    {"PCA": []},
    // {"Differentiation of Univariate functions": []},
    // {"Partial Differentiation and Gradients": []},
    // {"Gradients of Matrices": []},
    // {"Backpropagation and Automatic Differentiation": []},
    // {"Optimization using Gradient Descent": []},
    // {"Introduction to Probability and Statistic": []},
    // {"Baye's Theorem": []},
    // {"Independence and Law of Total Probability": []},
    // {"Probability Distributions": []},
    // {"Data, Models, and Learning": []},
    // {"Parameter Estimation": []},
    // {"Entropy and Mutual Information":[]},
    // {"KL Divergence and Cross Entropy": []}
]

export default class SideBox extends HTMLElement {
    constructor(){
        super();
    }

    connectedCallback(){
        let isResizing = false;
        let sideBoxOriginalWidth, sideBoxBoundingBox;

        this.className = "side-box";
        this.style.display = "block";
        this.innerHTML = sideBoxContent;
        const sideBoxObject = this;

        // const side_box_resizer = this.querySelector(".side-box-resizer");
        // const side_box_resizer_bar = this.querySelector(".side-box-resizer-bar");
        const sideBoxContentElement = this.querySelector(".side-box-content");
        const topicSelectEvent = new CustomEvent("topicSelectEvent", {});
        
        
        const elements = allTopics.map(element => {
            const name = Object.keys(element)[0];
            const elem = document.createElement("div");
            elem.className = "topic";
            elem.textContent = name;
            return elem
        })
        elements.forEach(element => {
            
            element.addEventListener("click", (event)=>{
                if(!(state.sideBox.topic === null)){
                    state.sideBox.topic.style.backgroundColor = null;
                }
                element.style.backgroundColor = "#cdd";
                state.sideBox.topic = element;
                // window.dispatchEvent(topicSelectEvent);
                if(topicsMap[element.textContent] != undefined)
                window.location.hash = topicsMap[element.textContent];
                else window.location.hash = "";


                // if
            })
            
            sideBoxObject.appendChild(element);
        });
        
    

    

        window.addEventListener("toolBarToggleEvent", toggleSideBox);
        // side_box_resizer.addEventListener("mousedown", startSideBoxResize)
        // side_box_resizer.addEventListener("touchstart", startSideBoxResize)

        // sideBoxBoundingBox = state.sideBox.boundingBox;

        function toggleSideBox(event){
            event.preventDefault();
            if(!state.toolBar.isTopicsExpanded){
                sideBoxObject.style.display = "none";
            }
            else{
                sideBoxObject.style.display = "block";
            }   
        }

        // function startSideBoxResize(event){
        //     isResizing = true;
        //     sideBoxOriginalWidth = sideBoxObject.offsetWidth;
        //     sideBoxBoundingBox = sideBoxObject.getBoundingClientRect();
        //     side_box_resizer_bar.style.backgroundColor = "#088";
    
        //     document.addEventListener("mousemove", resizeSideBox);
        //     document.addEventListener("mouseup", stopResizeSideBox);
    
        //     document.addEventListener("touchmove", resizeSideBox);
        //     document.addEventListener("touchend", stopResizeSideBox);
        //     document.addEventListener("touchcancel", stopResizeSideBox);
        // }
    
        // function resizeSideBox(event){
        //     let sideBoxResizerBoundingBox = side_box_resizer.getBoundingClientRect();
        //     let clientX;
        //     if (isTouchEvent(event)){
        //         const touch = event.touches[0];
        //         clientX = touch.clientX;
        //     }
        //     else{
        //         clientX = event.clientX;
        //     }
        //     const dx = parseInt(clientX-(sideBoxBoundingBox.x+sideBoxBoundingBox.width-sideBoxResizerBoundingBox.width/2)); 
    
        //     const width = Math.max(220, sideBoxOriginalWidth + dx)
    
        //     sideBoxObject.style.width = width +"px";
        // }
    
        // function stopResizeSideBox(){
        //     if(isResizing){
        //         isResizing = false;
    
        //         side_box_resizer_bar.style.backgroundColor = "#ccc";
    
        //         document.removeEventListener("mousemove", resizeSideBox);
        //         document.removeEventListener("mouseup", stopResizeSideBox)
    
        //         document.removeEventListener("touchmove", resizeSideBox);
        //         document.removeEventListener("touchend", stopResizeSideBox);
        //         document.removeEventListener("touchcancel", stopResizeSideBox);
    
        //     }
        // }
    }

}

customElements.define("mf-side-box", SideBox);