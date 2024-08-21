import { createSVGElement, createText } from "../../../utils/svg.js";




export default class ZeroVectorSpace extends HTMLElement{
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

        // Mark the origin (0,0) 
        svg.append(createSVGElement("circle", {"cx":200, "cy":200, "r":5, "fill":"red"}));

        const g = createSVGElement("g", {});
        g.innerHTML = `<text x="210" y="170" font-size="12" fill="black">
            <tspan x="210" dy="12" font-size="30">[</tspan>
            <tspan x="220" dy="-10">0</tspan>
            <tspan x="226" dy="10" font-size="30">]</tspan>
            <tspan x="220" dy="5">0</tspan>
        </text>`;
        svg.append(g);

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
            text.innerHTML = `<text y="${y}" x="${x+cellSize/div}" font-size="10" fill="black">${-i/cellSize}</text>`;
            svg.append(text)

        }

        figure.append(svg);
        const figcaption = document.createElement("figcaption")
        figcaption.textContent = String.raw`The point in red is a vector space containing only the zero vector, \(\begin{bmatrix}0 \\ 0\end{bmatrix}\)`;
        figure.append(figcaption);
        this.append(figure);

    }
}


customElements.define("mf-zero-vector-space", ZeroVectorSpace);