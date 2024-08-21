import { createSVGElement, SVGGridElement, SVGTextElement, SVGMatrixElement } from "../../../utils/svg.js";
import { renderColumnVector } from "../../../utils/text.js";
import { draw2dLineIntersection, draw2dVectorCombination } from "./utils.js";

// Systems of Linear Equations
export class SysLinearEqnsMat extends HTMLElement{
    
    constructor(){
        super();
        this.name = "Systems of Linear Equations and Matrices";
        this.state = {
            is2D: true,
            coeffs2d: {
                "x1-1": 4,
                "x2-1": 4,
                "b1": 5,
                "x1-2": 2,
                "x2-2": -4,
                "b2": 1
            },
            solution2d: "Line Intersection",
        }

        // this.fetchSytles(result => {
        //     this.css = result;
        // });
        // this.getVisualChoicesMarkUp().then(result => {
        //     this.visualChoicesMarkup = result;
        // });
        // this.get2DEquationsMarkup().then(result => {
        //     this.equations2dMarkup = result;
        // });
        // this.get3DEquationsMarkup().then(result => {
        //     this.equations3dMarkup = result;
        // });


    }

    async fetchSytles(){
        const request = await fetch("/components/topics/SysLinearEqnMat/SysLinearEqnMat.css");
        const css = await request.text();
        return css
    }

    async connectedCallback(){
        const style = document.createElement("style");
        style.textContent = await this.fetchSytles();
        this.appendChild(style);
        const header = document.createElement("div");
        const sysLinEqnButton = document.createElement("div");
        const matricesButton = document.createElement("div");
        const contentBlock = document.createElement("div");
        let contentChoice = null;
        const thisElement = this;

        header.className = "main-content-choices";
        contentBlock.className = "main-content-block";
        sysLinEqnButton.className = "main-content-choice";
        matricesButton.className = "main-content-choice";
        sysLinEqnButton.textContent = "System of Linear Equations";
        matricesButton.textContent = "Matrices";
        contentChoice = sysLinEqnButton;

        sysLinEqnButton.style.width = "200px";
        sysLinEqnButton.style.backgroundColor = "#cdd";
        header.append(sysLinEqnButton, matricesButton);

        header.addEventListener("click", (event)=>{

            event.preventDefault();
            if(event.target.className == "main-content-choice"){
                if (contentChoice != null){
                    contentChoice.style.backgroundColor = null;
                }
                event.target.style.backgroundColor = "#cdd";
                if(event.target.textContent == "System of Linear Equations" && contentChoice.textContent != event.target.textContent){
                    this.renderSysLinEqns(contentBlock);
                }
                if(event.target.textContent == "Matrices" && contentChoice.textContent != event.target.textContent){
                    this.renderMatrices(contentBlock);
                }
                contentChoice = event.target;
            }
        })

        this.appendChild(header);
        this.appendChild(contentBlock);
        await this.renderSysLinEqns(contentBlock);

    }

    async getVisualChoicesMarkUp(){
        const result = await fetch("./components/topics/SysLinearEqnMat/visualChoices.html");
        const markup = await result.text()
        return markup
    }

    async get2DEquationsMarkup(){
        const result = await fetch("/components/topics/SysLinearEqnMat/equations2D.html");
        const markup   = await result.text();
        return markup
    }

    async get3DEquationsMarkup(){
        const result = await fetch("/components/topics/SysLinearEqnMat/equations3D.html");
        const markup   = await result.text();
        return markup
    }

    renderMatrices(contentBlock){
        contentBlock.innerHTML = "";
        this.appendChild(contentBlock);
    }

    async renderSysLinEqns(contentBlock){
        const visualChoices = document.createElement("div");
        const content = document.createElement("div");
        const header = document.createElement("h3");
        const markup2d = await this.get2DEquationsMarkup();
        const markup3d = await this.get3DEquationsMarkup();
        const choices = await this.getVisualChoicesMarkUp();
        const controls = document.createElement("div");
        const canvas2d = document.createElement("canvas");
        const canvas3d = document.createElement("canvas");
        const thisElement = this;

        // canvas 2d
        const width = 400;
        const height = 400;
        canvas2d.width = width;
        canvas2d.height = height;
        const context2d = canvas2d.getContext("2d");

        // ======================================================
        const canvas1 = document.createElement("canvas");
        const svg2d = createSVGElement("svg");
        const svg2d_ = createSVGElement("svg", {"width":400, "height":400});
        const canvas2 = document.createElement("canvas");
        const container = document.createElement("div");
        const context1 = canvas1.getContext("2d");
        const context2 = canvas2.getContext("2d");
        canvas1.width = 400;
        canvas1.height = 600;
        canvas2.width = 600;
        canvas2.height = 600;

        svg2d.setAttribute("width", 400);
        svg2d.setAttribute("height", 400);


        canvas1.className = "linear-2d-right";
        svg2d.setAttribute("class","linear-2d-right");
        container.className = "linear-2d-container";
        container.append(svg2d);

        this.linearContainer2d = container;
        this.lineContainer2d = svg2d_;
        this.linearContainer2d_context1 = context1;
        this.linearContainer2d_context2 = context2;
        this.context2d = context2d;
        this.svg2d = svg2d;
        this.svg2d_ = svg2d_;
        
        // =========================================================

        header.textContent = "System of Linear Equations";
        visualChoices.innerHTML = choices;
        content.innerHTML = markup2d;

        controls.append(visualChoices, content)
        contentBlock.append(controls, svg2d_);
        this.renderCanvas2d(context2d);

        const radios = document.querySelectorAll('input[name="dimension"]');
        radios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                const lastElement = contentBlock.lastElementChild;
                if(event.target.value == "2d"){
                    content.innerHTML = markup2d;
                    const child = thisElement.state.solution2d == "Line Intersection" ? svg2d_ : container;
                    contentBlock.replaceChild(child, lastElement);
                    thisElement.addListenersFor2dInputs(context2d);
                    thisElement.addListenersfor2dSolutions(context2d);
                }
                else{
                    content.innerHTML = markup3d;
                    contentBlock.replaceChild(canvas3d, lastElement);
                }
                
            });
        });

        // solution choices
        const elements = this.querySelectorAll(".solution-choice");
        elements.forEach((elem)=>{
            if(elem.textContent == thisElement.state.solution2d){
                elem.style.backgroundColor = "#cdd";
            }
        });

        thisElement.addListenersFor2dInputs(context2d);
        thisElement.addListenersfor2dSolutions(context2d);
        // thisElement.addListenersFor2dSolution();
        this.contentBlock = contentBlock;
        window.MathJax.typeset();
    }

    addListenersfor2dSolutions(context){
        const thisElement = this;
        const elements = this.querySelectorAll(".solution-choice");
        elements.forEach((elem)=>{
            elem.addEventListener("click", handleClick);
        })

        function handleClick(event){
            elements.forEach(e => {e.style.backgroundColor = null});
            event.target.style.backgroundColor = "#cdd";
            thisElement.state.solution2d = event.target.textContent;
            
            // change lower canvas
            const lastElement = thisElement.contentBlock.lastElementChild;
            const child = thisElement.state.solution2d == "Line Intersection" ? thisElement.lineContainer2d : thisElement.linearContainer2d;
            thisElement.contentBlock.replaceChild(child, lastElement);
            thisElement.addListenersFor2dInputs(context);
            thisElement.renderCanvas2d(context);
        }   

    }

    addListenersFor2dInputs(context){
        const dims = [[1,1], [1,2],[2,1],[2,2]];
        const thisElement = this;

        dims.forEach((elem)=>{
            const inputElem = thisElement.querySelector(`#x${elem[0]}-${elem[1]}`);
            inputElem.value = thisElement.state.coeffs2d[`x${elem[0]}-${elem[1]}`];
            inputElem.addEventListener("input", handleInput);
            if (elem[1] == 2){
                inputElem.style.color = thisElement.state.solution2d == "Line Intersection" ? "red" : "black";
            }
            else{
                inputElem.style.color = thisElement.state.solution2d == "Line Intersection" ?  "blue" : "black";
            }
            if(elem[0]==1 && elem[1]==2){
                const inputElem1 = thisElement.querySelector(`#b${elem[0]}`);
                const inputElem2 = thisElement.querySelector(`#b${elem[1]}`);
                inputElem1.style.color = thisElement.state.solution2d == "Line Intersection" ?  "blue" : "black"
                inputElem2.style.color = thisElement.state.solution2d == "Line Intersection" ?  "red" : "black"
                inputElem1.value = thisElement.state.coeffs2d[`b${elem[0]}`];
                inputElem2.value = thisElement.state.coeffs2d[`b${elem[1]}`];
                inputElem1.addEventListener("input", handleInput);
                inputElem2.addEventListener("input", handleInput);
            }
        })
        
        
        function handleInput(event){
            thisElement.state.coeffs2d[event.target.id] = event.target.value;
            thisElement.renderCanvas2d(context);

        }

    }

  
    renderCanvas2d(context){
        console.log(this.state.solution2d);
        if (this.state.is2D && this.state.solution2d == "Line Intersection"){
            this.render2dLineIntersection(context);
        }
        else{
            this.render2dLinearCombination(context);
        }
    }

    render2dLinearCombination(context){        
        const svg = this.svg2d;
        svg.innerHTML = "";
        const eqn1 = [this.state.coeffs2d["x1-1"], this.state.coeffs2d["x2-1"], this.state.coeffs2d["b1"]];
        const eqn2 = [this.state.coeffs2d["x1-2"], this.state.coeffs2d["x2-2"], this.state.coeffs2d["b2"]];
        draw2dVectorCombination(svg, eqn1, eqn2);
    }

    render2dLineIntersection(context)
    {
        const svg = this.svg2d_;
        svg.innerHTML = "";
        const eqn1 = [this.state.coeffs2d["x1-1"], this.state.coeffs2d["x2-1"], this.state.coeffs2d["b1"]];
        const eqn2 = [this.state.coeffs2d["x1-2"], this.state.coeffs2d["x2-2"], this.state.coeffs2d["b2"]];
        let grid = new SVGGridElement(svg, 50);
        draw2dLineIntersection(grid, eqn1, eqn2, {fontSize: 18});

    }

    renderCanvas3d(canvas3d){

    }



   

}

customElements.define("mf-syslineareqnsmat", SysLinearEqnsMat);