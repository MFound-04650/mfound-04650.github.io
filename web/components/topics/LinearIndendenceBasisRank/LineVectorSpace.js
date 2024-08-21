import { createSVGElement, createText } from "../../../utils/svg.js";




export default class LineVectorSpace extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.style.display = "block";
        this.style.width = "600px";
        this.style.marginRight = "auto";
        this.style.marginLeft = "auto";
        const midX = 200;
        const midY = 200;
        const cellSize = 40;
        const xTicks = []
        const svg = createSVGElement("svg", {"width": 400, "height":400});
        const figure = document.createElement("figure");

        const lambdaInputContainer = document.createElement("div");
        lambdaInputContainer.innerHTML = `<label for="lambda-slider">λ: </label>
        <input type="range" id="lambda-slider" min="-2.5" max="2.5" step="0.1" value="1">
        <span id="lambda-value">1</span>`;
        lambdaInputContainer.style.width = "200px";
        lambdaInputContainer.style.marginRight = "auto";
        lambdaInputContainer.style.marginLeft = "auto";


        // figure.style.width = "600px";
        svg.style.width = "400px";
        svg.style.marginLeft = "auto";
        svg.style.marginRight = "auto";

        // Draw the x and y axes
        svg.append(createSVGElement("line", {"x1":0, "y1":200, "x2":400, "y2":200, "stroke":"black"}));
        svg.append(createSVGElement("line", {"x1":200, "y1":0, "x2":200, "y2":400, "stroke":"black"}));

        // Draw line
        svg.append(createSVGElement("line", {"x1":-1*400, "y1":-2*400, "x2":1*400, "y2":2*400, "stroke":"red",
            "stroke-width":"3", transform: `translate(${midX}, ${midY}) scale(1, -1)`}));

        let x, y, text;
        let div = 8
        for(let i=cellSize; i<=200; i+=cellSize){
            x = midX + i
            y = midY
            svg.append(createSVGElement("line", {"x1":x, "y1":y-cellSize/div, "x2":x, "y2":y+cellSize/div, "stroke":"black"}));
            text = createSVGElement("g");
            text.innerHTML = `<text x="${x}" y="${y+cellSize/div+10}" font-size="10" fill="black">${i/cellSize}</text>`;
            svg.append(text)

            x = midX - i
            y = midY
            svg.append(createSVGElement("line", {"x1":x, "y1":y-cellSize/div, "x2":x, "y2":y+cellSize/div, "stroke":"black"}));
            text = createSVGElement("g");
            text.innerHTML = `<text x="${x-10}" y="${y+cellSize/div+10}" font-size="10" fill="black">${-i/cellSize}</text>`;
            svg.append(text)


            x = midX
            y = midY + i
            svg.append(createSVGElement("line", {"y1":y, "x1":x-cellSize/div, "y2":y, "x2":x+cellSize/div, "stroke":"black"}));
            text = createSVGElement("g");
            text.innerHTML = `<text y="${y}" x="${x+cellSize/div}" font-size="10" fill="black">${-i/cellSize}</text>`;
            svg.append(text)


            x = midX
            y = midY - i
            svg.append(createSVGElement("line", {"y1":y, "x1":x-cellSize/div, "y2":y, "x2":x+cellSize/div, "stroke":"black"}));
            text = createSVGElement("g");
            text.innerHTML = `<text y="${y}" x="${x+cellSize/div}" font-size="10" fill="black">${i/cellSize}</text>`;
            svg.append(text)

        }

        figure.append(svg);
        const figcaption = document.createElement("figcaption")
        figcaption.textContent = String.raw`The red line  is a vector space containing all scalar multiples of the vector, \(\begin{bmatrix}1 \\ 2\end{bmatrix}\). Adjusting the slider for \(\lambda\) produces a vector in this space, represented as a black dot. All vectors lie on the red line.`;
        figure.append(figcaption);
        this.append(lambdaInputContainer);
        this.append(figure);


        // slider
        const slider = document.getElementById("lambda-slider");
        const sliderValue = document.getElementById("lambda-value");
        console.log(slider);
        const vec = createSVGElement("circle", {"cx":1*cellSize, "cy":2*cellSize, "r":3, "fill":"black", transform: `translate(${midX}, ${midY}) scale(1, -1)`});
        
        const vectext = createSVGElement("g");
        vectext.innerHTML = `<text x="${1*cellSize}" y="${-2*cellSize}" font-size="12" fill="black", transform="translate(${midX}, ${midY}) scale(1, 1)">[1,2]</text>`;
        svg.append(vec, vectext);
        slider.addEventListener("input", e=>{
            const lambda = parseFloat(e.target.value);

            // draw the vector as a black point
            const attribs = {"cx":lambda*1*cellSize, "cy":lambda*2*cellSize};
            for(const attr in attribs){
                vec.setAttribute(attr, attribs[attr]);
            }
            vectext.innerHTML = `<text x="${1*cellSize*lambda}" y="${-2*cellSize*lambda}" font-size="12" fill="black", transform="translate(${midX}, ${midY}) scale(1, 1)">[${lambda*1},${lambda*2}]</text>`;

            // update slider value
            sliderValue.textContent = lambda;
            console.log(sliderValue.textContent);
        });

        

    }
}


customElements.define("mf-line-vector-space", LineVectorSpace);