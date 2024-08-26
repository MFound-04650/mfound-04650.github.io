import { createSVGElement, createText } from "../../../utils/svg.js";




export default class AnglesAndOrthogonality extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.style.display = "block";
        this.style.width = "600px";
        this.style.margin = "40px";
        this.style.marginRight = "auto";
        this.style.marginLeft = "auto";
        const midX = 200;
        const midY = 200;
        const cellSize = 40;
        const xTicks = []
        const svg = createSVGElement("svg", {"width": 400, "height":400});
        const figure = document.createElement("figure");
        const header = document.createElement("div");
        header.textContent="how are you";


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

        figure.append(header);
        header.style.textAlign = "center";
        figure.append(svg);
        const figcaption = document.createElement("figcaption")
        figcaption.innerHTML = String.raw`This figure displays the angle between vectors <span style="color:red;">x</span> and <span style="color:blue;">y</span> and the distance between them. You can drag the vectors to reposition them and observe the angle between them.`;
        figure.append(figcaption);
        this.append(figure);

        const vec1 = [3, 4];
        const vec2 = [-4, 3];

        const vectorText1 = createSVGElement("text", {"x":midX+vec1[0]*cellSize+5,"y":midY-(vec1[1]*cellSize+5)});
        const vectorText11 = createSVGElement("text", {"x":midX+vec1[0]*cellSize/2+5,"y":midY-(vec1[1]*cellSize/2+5), "fill":"red"});
        const vectorPoint1 = createSVGElement("circle", {"cx":midX+vec1[0]*cellSize, "cy":midY-vec1[1]*cellSize, "r":3, "fill":"red"});
        const vectorLine1 = createSVGElement("line", {"x1":midX,"y1":midY, "x2":midX+vec1[0]*cellSize,"y2":midY-vec1[1]*cellSize,"stroke":"red"});
        vectorText1.textContent = `[${vec1[0].toFixed(1)}, ${vec1[1].toFixed(1)}]`;
        vectorText11.textContent = `x`;
        
        const vectorText2 = createSVGElement("text", {"x":midX+vec2[0]*cellSize+5,"y":midY-(vec2[1]*cellSize+5)});
        const vectorText22 = createSVGElement("text", {"x":midX+vec2[0]*cellSize/2+5,"y":midY-(vec2[1]*cellSize/2+5), "fill":"blue"});
        const vectorPoint2 = createSVGElement("circle", {"cx":midX+vec2[0]*cellSize, "cy":midY-vec2[1]*cellSize, "r":3, "fill":"blue"});
        const vectorLine2 = createSVGElement("line", {"x1":midX,"y1":midY, "x2":midX+vec2[0]*cellSize,"y2":midY-vec2[1]*cellSize,"stroke":"blue"});
        vectorText2.textContent = `[${vec2[0].toFixed(1)}, ${vec2[1].toFixed(1)}]`;
        vectorText22.textContent = `y`;

        const angle = ((Math.acos(parseFloat((vec2[0]*vec1[0] + vec2[1]*vec1[1]).toFixed(2))/(parseFloat(Math.sqrt(Math.pow(vec1[0],2) + Math.pow(vec1[1],2)).toFixed(2))*Math.sqrt(Math.pow(vec2[0],2) + Math.pow(vec2[1],2)).toFixed(2))))/Math.PI)*180
        header.innerHTML = String.raw`
    <span style="color:red;">||x||</span> = ${Math.sqrt(Math.pow(vec1[0],2) + Math.pow(vec1[1],2)).toFixed(2)}, <span style="color:blue">||y||</span> = ${Math.sqrt(Math.pow(vec2[0],2) + Math.pow(vec2[1],2)).toFixed(2)}, <span>&#x27E8;x, y&#x27E9;</span> = ${(vec2[0]*vec1[0] + vec2[1]*vec1[1]).toFixed(2)}, angle = ${angle.toFixed(2)}°
    `;

        // const diffLine = createSVGElement("line", {"x1":midX+vec1[0]*cellSize,"y1":midY-vec1[1]*cellSize,"x2":midX+vec2[0]*cellSize,"y2":midY-vec2[1]*cellSize,"stroke":"green"});

        svg.append(vectorText1);
        svg.append(vectorText11);
        svg.append(vectorPoint1);
        svg.append(vectorLine1);

        svg.append(vectorText2);
        svg.append(vectorText22);
        svg.append(vectorPoint2);
        svg.append(vectorLine2);

        // svg.append(diffLine);

        function updateVectors(){
            
            vectorPoint1.setAttribute("cx",midX + vec1[0]*cellSize);
            vectorPoint1.setAttribute("cy",midY - vec1[1]*cellSize);
            vectorText1.setAttribute("x",midX + vec1[0]*cellSize);
            vectorText1.setAttribute("y",midY - vec1[1]*cellSize);
            vectorText11.setAttribute("x",midX + vec1[0]/2*cellSize);
            vectorText11.setAttribute("y",midY - vec1[1]/2*cellSize);
            vectorText1.textContent = `[${vec1[0].toFixed(1)}, ${vec1[1].toFixed(1)}]`;
            vectorLine1.setAttribute("x2",midX + vec1[0]*cellSize);
            vectorLine1.setAttribute("y2",midY - vec1[1]*cellSize);

            vectorPoint2.setAttribute("cx",midX + vec2[0]*cellSize);
            vectorPoint2.setAttribute("cy",midY - vec2[1]*cellSize);
            vectorText2.setAttribute("x",midX + vec2[0]*cellSize);
            vectorText2.setAttribute("y",midY - vec2[1]*cellSize);
            vectorText22.setAttribute("x",midX + vec2[0]*cellSize/2 + 5);
            vectorText22.setAttribute("y",midY - vec2[1]*cellSize/2 + 5);
            vectorText2.textContent = `[${vec2[0].toFixed(1)}, ${vec2[1].toFixed(1)}]`;
            vectorLine2.setAttribute("x2",midX + vec2[0]*cellSize);
            vectorLine2.setAttribute("y2",midY - vec2[1]*cellSize);

            // diffLine.setAttribute("x1", midX + vec1[0]*cellSize);
            // diffLine.setAttribute("y1", midY - vec1[1]*cellSize);
            // diffLine.setAttribute("x2", midX + vec2[0]*cellSize);
            // diffLine.setAttribute("y2", midY - vec2[1]*cellSize);

            const angle = ((Math.acos(parseFloat((vec2[0]*vec1[0] + vec2[1]*vec1[1]).toFixed(2))/(parseFloat(Math.sqrt(Math.pow(vec1[0],2) + Math.pow(vec1[1],2)).toFixed(2))*Math.sqrt(Math.pow(vec2[0],2) + Math.pow(vec2[1],2)).toFixed(2))))/Math.PI)*180
            header.innerHTML = String.raw`
        <span style="color:red;">||x||</span> = ${Math.sqrt(Math.pow(vec1[0],2) + Math.pow(vec1[1],2)).toFixed(2)}, <span style="color:blue">||y||</span> = ${Math.sqrt(Math.pow(vec2[0],2) + Math.pow(vec2[1],2)).toFixed(2)}, <span>&#x27E8;x, y&#x27E9;</span> = ${(vec2[0]*vec1[0] + vec2[1]*vec1[1]).toFixed(2)}, angle = ${angle.toFixed(2)}°
        `;
           
        }
        

        let mouseX, mouseY, startMove, targetVec;
        svg.addEventListener("mousemove", e=>{
            if(startMove){
                const x = (e.offsetX-midX)/cellSize;
                const y = (midY-e.offsetY)/cellSize

                if (targetVec == "vec1"){
                    vec1[0] = parseFloat(Math.min(Math.max(x, -midX/cellSize), midX/cellSize).toFixed(1));
                    vec1[1] = parseFloat(Math.min(Math.max(y, -midY/cellSize), midY/cellSize).toFixed(1));
                }    
                else if(targetVec == "vec2"){
                    vec2[0] = parseFloat(Math.min(Math.max(x, -midX/cellSize), midX/cellSize).toFixed(1));
                    vec2[1] = parseFloat(Math.min(Math.max(y, -midY/cellSize), midY/cellSize).toFixed(1));
                }
                
                updateVectors()
            }
            
        });
        svg.addEventListener("mousedown", e=>{

            startMove = true;
            if(startMove){
                const x = (e.offsetX-midX)/cellSize;
                const y = (midY-e.offsetY)/cellSize;
                
                let vec1Diff = Math.abs(vec1[0]-x) + Math.abs(vec1[1]-y);
                let vec2Diff = Math.abs(vec2[0]-x) + Math.abs(vec2[1]-y);

                targetVec = null;
                if(vec1Diff < vec2Diff){
                    if (Math.abs(vec1Diff) < 1){
                        targetVec = "vec1";
                    }
                }
                else{
                    if(Math.abs(vec2Diff) < 1){
                        targetVec = "vec2";
                    }
                }
                mouseX = x;
                mouseY = y;
            }

            // console.log([vec1Diff, vec2Diff]);
        });
        svg.addEventListener("mouseup", e=>{
            startMove = false;
        });

        

    }
}


customElements.define("mf-angles-and-orthogonality", AnglesAndOrthogonality);