import { createSVGElement, createText } from "../../../utils/svg.js";




export default class LengthsAndDistances extends HTMLElement{
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
        // svg.append(createSVGElement("circle", {"cx":midX, "cy":midY, "r":cellSize, "stroke":"red", "fill":"none"}));
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
        figcaption.textContent = String.raw`All vectors on the red outline above all have an LengthsAndDistances norm of 1`;
        figure.append(figcaption);
        this.append(figure);

        const vec1 = [1, 3];
        const vec2 = [3, 1];

        const vectorText1 = createSVGElement("text", {"x":midX+vec1[0]*cellSize+5,"y":midY-(vec1[1]*cellSize+5)});
        const vectorPoint1 = createSVGElement("circle", {"cx":midX+vec1[0]*cellSize, "cy":midY-vec1[1]*cellSize, "r":3, "fill":"red"});
        const vectorLine1 = createSVGElement("line", {"x1":midX,"y1":midY, "x2":midX+vec1[0]*cellSize,"y2":midY-vec1[1]*cellSize,"stroke":"red"});
        vectorText1.textContent = `[${vec1[0].toFixed(1)}, ${vec1[1].toFixed(1)}]`;
        
        const vectorText2 = createSVGElement("text", {"x":midX+vec2[0]*cellSize+5,"y":midY-(vec2[1]*cellSize+5)});
        const vectorPoint2 = createSVGElement("circle", {"cx":midX+vec2[0]*cellSize, "cy":midY-vec2[1]*cellSize, "r":3, "fill":"blue"});
        const vectorLine2 = createSVGElement("line", {"x1":midX,"y1":midY, "x2":midX+vec2[0]*cellSize,"y2":midY-vec2[1]*cellSize,"stroke":"blue"});
        vectorText2.textContent = `[${vec2[0].toFixed(1)}, ${vec2[1].toFixed(1)}]`;

        const diffLine = createSVGElement("line", {"x1":midX+vec1[0]*cellSize,"y1":midY-vec1[1]*cellSize,"x2":midX+vec2[0]*cellSize,"y2":midY-vec2[1]*cellSize,"stroke":"green"});

        svg.append(vectorText1);
        svg.append(vectorPoint1);
        svg.append(vectorLine1);

        svg.append(vectorText2);
        svg.append(vectorPoint2);
        svg.append(vectorLine2);

        svg.append(diffLine);

        svg.addEventListener("mousemove", e=>{
           
        });

    }
}


customElements.define("mf-lengths-and-distances", LengthsAndDistances);