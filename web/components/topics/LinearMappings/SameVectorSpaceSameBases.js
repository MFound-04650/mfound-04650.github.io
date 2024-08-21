import { createSVGElement, createText } from "../../../utils/svg.js";




export default class SameVectorSpaceSameBases extends HTMLElement{
    constructor(){
        super();
        this.state = {
            bases: [[1,0],[0,1]],
            cellSize: 20,
            vector: [4,4],
            tranVector: [4,4],
            tranMat: [[1,0],[0,1]],
            vec1Pos: null,
            
        }
    }

    connectedCallback(){
        this.container = document.createElement("div");
        this.svg1 = createSVGElement("svg", {"width":400, "height":400});
        this.svg2 = createSVGElement("svg", {"width":400, "height":400});
        this.svgleft = createSVGElement("svg", {"width":20, "height":100});
        this.svgright = createSVGElement("svg", {"width":20, "height":100});
        this.transMat = document.createElement("div"); 

        this.svg1.append(...this.getBasesGrid(), ...this.getBases());
        this.svg2.append(...this.getBasesGrid(), ...this.getBases());
        this.transMat.innerHTML = this.transformMatElement();
        
        this.container.style.marginBottom = "20px";
        this.container.style.display = "flex";
        this.container.style.alignItems = "center";
        this.transMat.style.display = "flex";
        this.transMat.style.flexDirection = "column";
        this.transMat.style.alignItems = "center";
        this.transMat.style.justifyContent = "center";
        this.container.append(this.svg1, this.transMat, this.svg2);
        this.append(this.container);

        this.addListenersForInputs();
        this.updateVectors();
    }

    addListenersForInputs(){
        const t = this;
        const a = document.querySelector("#same-vector-space-same-bases-a");
        const b = document.querySelector("#same-vector-space-same-bases-b");
        const c = document.querySelector("#same-vector-space-same-bases-c");
        const d = document.querySelector("#same-vector-space-same-bases-d");

        a.value = this.state.tranMat[0][0];
        a.addEventListener("input", e=>{
            t.state.tranMat[0][0] = parseFloat(e.target.value ? e.target.value : 0);
            this.updateVectors();
        });
        b.value = this.state.tranMat[0][1];
        b.addEventListener("input", e=>{
            t.state.tranMat[0][1] = parseFloat(e.target.value ? e.target.value : 0);
            this.updateVectors();
        });
        c.value = this.state.tranMat[1][0];
        c.addEventListener("input", e=>{
            t.state.tranMat[1][0] = parseFloat(e.target.value ? e.target.value : 0);
            this.updateVectors();
        });
        d.value = this.state.tranMat[1][1];
        d.addEventListener("input", e=>{
            t.state.tranMat[1][1] = parseFloat(e.target.value ? e.target.value : 0);
            this.updateVectors();
        });

    }

    transformMatElement(){
        return `
        <style>
        .i-box{
            width: 50px;
            margin: 10px;
            text-align: center;
            border: none;

        }
        .tmats{
            text-align: center;
        }

        .same-vector-space-same-bases-container{
            display: flex;
        }

        </style>
        <p class="tmats">Transformation Matrix</p>
        <div class="same-vector-space-same-bases-container">
            <input id="same-vector-space-same-bases-a" class="i-box" type="number"></input>
            <input id="same-vector-space-same-bases-b" class="i-box" type="number"></input>
        </div>
        <div class="same-vector-space-same-bases-container">
            <input id="same-vector-space-same-bases-c" class="i-box" type="number"></input>
            <input id="same-vector-space-same-bases-d" class="i-box" type="number"></input>
        </div>
        `
    }

    getBasesGrid(){
        const cellSize = this.state.cellSize;
        const midX = (400/cellSize)/2;
        const midY = (400/cellSize)/2;
        const stepsX = Math.ceil(midX/cellSize);
        const stepsY = Math.ceil(midY/cellSize);
        const bases = this.state.bases;
        const lines = [];

        for(let i=0; i<midX; i++){

            lines.push(...[
                createSVGElement(
                    "line", {x1:0, y1:0, x2:bases[1][0], y2: bases[1][1]*cellSize*midY, stroke:"rgba(0, 0, 0, 0.1)",
                        transform: `translate(${midX*cellSize + i*cellSize}, ${midY*cellSize}) scale(1, -1)`
                    }
                ),
                createSVGElement(
                    "line", {x1:0, y1:0, x2:bases[1][0], y2: bases[1][1]*cellSize*midY, stroke:"rgba(0, 0, 0, 0.1)",
                        transform: `translate(${midX*cellSize - (i+1)*cellSize}, ${midY*cellSize}) scale(1, -1)`
                    }
                ),

                createSVGElement(
                    "line", {x1:0, y1:0, x2:bases[1][0], y2: bases[1][1]*cellSize*midY, stroke:"rgba(0, 0, 0, 0.1)",
                        transform: `translate(${midX*cellSize + i*cellSize}, ${midY*cellSize}) scale(1, 1)`
                    }
                ),
                createSVGElement(
                    "line", {x1:0, y1:0, x2:bases[1][0], y2: bases[1][1]*cellSize*midY, stroke:"rgba(0, 0, 0, 0.1)",
                        transform: `translate(${midX*cellSize - (i+1)*cellSize}, ${midY*cellSize}) scale(1, 1)`
                    }
                )
            ]);
        }

        for(let i=0; i<midY; i++){

            lines.push(...[
                createSVGElement(
                    "line", {x1:0, y1:0, x2:bases[0][0]*cellSize*midX, y2: bases[0][1], stroke:"rgba(0, 0, 0, 0.1)",
                        transform: `translate(${midX*cellSize }, ${midY*cellSize+ i*cellSize}) scale(1, -1)`
                    }
                ),
                createSVGElement(
                    "line", {x1:0, y1:0, x2:bases[0][0]*cellSize*midX, y2: bases[0][1], stroke:"rgba(0, 0, 0, 0.1)",
                        transform: `translate(${midX*cellSize}, ${midY*cellSize - (i+1)*cellSize}) scale(1, -1)`
                    }
                ),

                createSVGElement(
                    "line", {x1:0, y1:0, x2:bases[0][0]*cellSize*midX, y2: bases[0][1], stroke:"rgba(0, 0, 0, 0.1)",
                        transform: `translate(${midX*cellSize }, ${midY*cellSize+ i*cellSize}) scale(-1, -1)`
                    }
                ),
                createSVGElement(
                    "line", {x1:0, y1:0, x2:bases[0][0]*cellSize*midX, y2: bases[0][1], stroke:"rgba(0, 0, 0, 0.1)",
                        transform: `translate(${midX*cellSize}, ${midY*cellSize - (i+1)*cellSize}) scale(-1, -1)`
                    }
                ),
            ]);
            
        }
        return lines
    }

    updateVectors(){
        const t = this;
        this.getVectors();
        this.svg1.appendChild(this.vec1);
        this.svg2.appendChild(this.vec2);

    }

    getVectors(){
        const cellSize = this.state.cellSize;  
        const vector1 = this.state.vector;      
        const midX = (400/cellSize)/2;
        const midY = (400/cellSize)/2;

        const vec1 = createSVGElement("g");
        
        vec1.append(createSVGElement("circle", 
            {
                cx: vector1[0]*cellSize, cy:vector1[1]*cellSize, r:2, fill:"rgba(0,0,0)", 
                transform: `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`
            }
        ),
        createSVGElement("line", {x1:0, y1:0, x2:vector1[0]*cellSize, y2:vector1[1]*cellSize, stroke:"rgba(0,0,0)",
            transform: `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`
        }),
        createText(`(${vector1[0]},${vector1[1]})`, {x: vector1[0]*cellSize, y:-vector1[1]*cellSize, fill: "blue", transform: `translate(${midX*cellSize}, ${midY*cellSize})`})
    
        );

        const A = math.matrix(this.state.tranMat);

        // Matrix Multiplication
        const vector2 = math.multiply(A, math.matrix(this.state.vector))._data;
        this.state.tranVector = vector2;

        // console.log(A._data);
        // console.log(vector2);


        const vec2 = createSVGElement("g");
        vec2.append(createSVGElement("circle", 
            {
                cx: vector2[0]*cellSize, cy:vector2[1]*cellSize, r:2, fill:"rgba(0,0,0)", 
                transform: `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`
            }
        ),
        createSVGElement("line", {x1:0, y1:0, x2:vector2[0]*cellSize, y2:vector2[1]*cellSize, stroke:"rgba(0,0,0)",
            transform: `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`
        }),

        createText(`(${vector2[0]},${vector2[1]})`, {x: vector2[0]*cellSize, y:-vector2[1]*cellSize, fill: "blue", transform: `translate(${midX*cellSize}, ${midY*cellSize})`})
    
        );

        if("vec1" in this) this.vec1.remove();
        if("vec2" in this) this.vec2.remove();
        this.vec1 = vec1;
        this.vec2 = vec2;
    }

    getBases(){
        const cellSize = this.state.cellSize;
        const bases = this.state.bases;
        const midX = (400/cellSize)/2;
        const midY = (400/cellSize)/2;

        const line1 = createSVGElement("line", {x1:0, y1:0, x2: bases[0][0]*cellSize, y2:bases[0][1]*cellSize,
            stroke: "rgba(0,0,0,0.5)",
            transform: `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`
        });
        
        // arrow
        const arrow1 = createSVGElement("polygon", 
            {
                points: `${bases[0][0]*cellSize-5},${bases[0][1]*cellSize-2} ${bases[0][0]*cellSize-5},${bases[0][1]*cellSize+2} ${bases[0][0]*cellSize},${bases[0][1]*cellSize}`,
                fill: "rgba(0,0,0,0.5)",
                transform: `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`
            });


        const line2 = createSVGElement("line", {x1:0, y1:0, x2: bases[1][0]*cellSize, y2:bases[1][1]*cellSize,
            stroke: "rgba(0,0,0,0.5)",
            transform: `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`
        });
        
        // arrow
        const arrow2 = createSVGElement("polygon", 
            {
                points: `${bases[1][0]*cellSize-2},${bases[1][1]*cellSize-5} ${bases[1][0]*cellSize+2},${bases[1][1]*cellSize-5} ${bases[1][0]*cellSize},${bases[1][1]*cellSize}`,
                fill: "rgba(0,0,0,0.5)",
                transform: `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`
        });

        return [line1, arrow1, line2, arrow2]
    }
        
        
}


customElements.define("mf-linear-transform-same-vector-space-same-bases", SameVectorSpaceSameBases);