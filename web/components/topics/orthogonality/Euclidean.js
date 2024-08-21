import { createSVGElement, createText } from "../../../utils/svg.js";




export default class Euclidean extends HTMLElement{
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
        const cellSize = 90;
        const xTicks = []
        const svg = createSVGElement("svg", {"width": 400, "height":400});
        const figure = document.createElement("figure");


        // figure.style.width = "600px";
        svg.style.width = "400px";
        svg.style.marginLeft = "auto";
        svg.style.marginRight = "auto";

        // Draw the x and y axes
        svg.append(createSVGElement("line", {"x1":0, "y1":200, "x2":400, "y2":200, "stroke":"black"}));
        svg.append(createSVGElement("line", {"x1":200, "y1":0, "x2":200, "y2":400, "stroke":"black"}));

        // Draw line
        // svg.append(createSVGElement("line", {"x1":-1*cellSize, "y1":-1*cellSize, "x2":-1*cellSize, "y2":1*cellSize, "stroke":"red",
        //     "stroke-width":"1", transform: `translate(${midX}, ${midY}) scale(1, -1)`}));
        // svg.append(createSVGElement("line", {"x1":-1*cellSize, "y1":-1*cellSize, "x2":1*cellSize, "y2":-1*cellSize, "stroke":"red",
        //     "stroke-width":"1", transform: `translate(${midX}, ${midY}) scale(1, -1)`}));
        // svg.append(createSVGElement("line", {"x1":1*cellSize, "y1":1*cellSize, "x2":1*cellSize, "y2":-1*cellSize, "stroke":"red",
        //     "stroke-width":"1", transform: `translate(${midX}, ${midY}) scale(1, -1)`}));
        // svg.append(createSVGElement("line", {"x1":1*cellSize, "y1":1*cellSize, "x2":-1*cellSize, "y2":1*cellSize, "stroke":"red",
        //     "stroke-width":"1", transform: `translate(${midX}, ${midY}) scale(1, -1)`}));
        svg.append(createSVGElement("circle", {"cx":midX, "cy":midY, "r":cellSize, "stroke":"red", "fill":"none"}));
        let x, y, text;
        let div = 16
        for(let i=cellSize; i<=200; i+=cellSize){
            x = midX + i
            y = midY
            svg.append(createSVGElement("line", {"x1":x, "y1":y-cellSize/div, "x2":x, "y2":y+cellSize/div, "stroke":"black"}));
            text = createSVGElement("g");
            text.innerHTML = `<text x="${x}" y="${y+cellSize/div+10}" font-size="15" fill="black">${i/cellSize}</text>`;
            svg.append(text)

            x = midX - i
            y = midY
            svg.append(createSVGElement("line", {"x1":x, "y1":y-cellSize/div, "x2":x, "y2":y+cellSize/div, "stroke":"black"}));
            text = createSVGElement("g");
            text.innerHTML = `<text x="${x-10}" y="${y+cellSize/div+10}" font-size="15" fill="black">${-i/cellSize}</text>`;
            svg.append(text)


            x = midX
            y = midY + i
            svg.append(createSVGElement("line", {"y1":y, "x1":x-cellSize/div, "y2":y, "x2":x+cellSize/div, "stroke":"black"}));
            text = createSVGElement("g");
            text.innerHTML = `<text y="${y}" x="${x+cellSize/div}" font-size="15" fill="black">${-i/cellSize}</text>`;
            svg.append(text)


            x = midX
            y = midY - i
            svg.append(createSVGElement("line", {"y1":y, "x1":x-cellSize/div, "y2":y, "x2":x+cellSize/div, "stroke":"black"}));
            text = createSVGElement("g");
            text.innerHTML = `<text y="${y}" x="${x+cellSize/div}" font-size="15" fill="black">${i/cellSize}</text>`;
            svg.append(text)

        }

        figure.append(svg);
        const figcaption = document.createElement("figcaption")
        figcaption.textContent = String.raw`All vectors on the red outline above all have an Euclidean norm of 1`;
        figure.append(figcaption);
        this.append(figure);

        const vectorText = createSVGElement("text", {"x":midX+cellSize+5,"y":midY-5});
        const vectorPoint = createSVGElement("circle", {"cx":midX+cellSize, "cy":midY, "r":3, "fill":"black"})
        vectorText.textContent = `[${1.00.toFixed(2)}, ${0.00.toFixed(2)}]`;
        svg.append(vectorText);
        svg.append(vectorPoint);

        svg.addEventListener("mousemove", e=>{
            let x = (e.offsetX-midX)/cellSize;
            let y = (midY-e.offsetY)/cellSize;
            if(Math.abs(x) > 1){
                x = x/Math.abs(x)
            }
            if(Math.abs(y) > 1){
                y = y/Math.abs(y)
            }
            
            if(Math.pow(x,2) < 1){
                x = Math.sign(x)*Math.sqrt((1 - Math.pow(y,2)))
            }
            else{
                y = Math.sign(y)*Math.sqrt((1 - Math.pow(x,2)))
            }
            
            e.target.style.cursor = "pointer";
            vectorText.textContent = `[${x.toFixed(2)}, ${y.toFixed(2)}]`;
            const attribs = {"x":x*cellSize+midX, "y":midY-y*cellSize}
            vectorText.setAttribute("x", x*cellSize+midX+5);
            vectorText.setAttribute("y", midY-y*cellSize-5);
            vectorPoint.setAttribute("cx", x*cellSize+midX);
            vectorPoint.setAttribute("cy", midY-y*cellSize);
            
        });

    }
}


customElements.define("mf-euclidean", Euclidean);