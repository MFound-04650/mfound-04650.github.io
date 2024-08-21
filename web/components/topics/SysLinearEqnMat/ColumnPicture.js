import { SVGTextElement, createSVGElement } from "../../../utils/svg.js";

const elementStyle = `
.column-picture-svg {
    b
}

`;


export default class ColumnPicture extends HTMLElement{
    constructor(){
        super();
        
    }

    connectedCallback(){
        this.svg = createSVGElement("svg", {width: 400, height: 150});
        this.container = document.createElement("div");
        this.container.appendChild(this.svg);
        const t = this;

        const grp = createSVGElement("g")
        const x1_1 = new SVGTextElement(
            grp, 
            `x<tspan font-size="10" baseline-shift="sub">1</tspan>`,
            {x: 10, y: 10, id:"x1_1"}
        );
        const x1_2 = new SVGTextElement(
            grp, 
            `x<tspan font-size="10" baseline-shift="sub">1</tspan>`,
            {x: 10, y: 10}
        );
        const x2_1 = new SVGTextElement(
            grp, 
            `x<tspan font-size="10" baseline-shift="sub">2</tspan>`,
            {x: 10, y: 10}
        );
        const x2_2 = new SVGTextElement(
            grp, 
            `x<tspan font-size="10" baseline-shift="sub">2</tspan>`,
            {x: 10, y: 10}
        );
        const four1 = new SVGTextElement(
            grp, 
            `4`,
            {x: 10, y: 10}
        );
        const four2 = new SVGTextElement(
            grp, 
            `4`,
            {x: 10, y: 10}
        );
        const minusFour = new SVGTextElement(
            grp, 
            `-4`,
            {x: 10, y: 10}
        );
        const two = new SVGTextElement(
            grp, 
            `2`,
            {x: 10, y: 10}
        );
        const five = new SVGTextElement(
            grp, 
            `5`,
            {x: 10, y: 10}
        );
        const one = new SVGTextElement(
            grp, 
            `1`,
            {x: 10, y: 10}
        );
        const plus1 = new SVGTextElement(
            grp, 
            `+`,
            {x: 10, y: 10}
        );
        const plus2 = new SVGTextElement(
            grp, 
            `+`,
            {x: 10, y: 10}
        );
        const equals1 = new SVGTextElement(
            grp, 
            `=`,
            {x: 10, y: 10}
        );
        const equals2 = new SVGTextElement(
            grp, 
            `=`,
            {x: 10, y: 10}
        );
        const cellSize = 20;

        // eqn1
        four1.setAttributes({x:2*cellSize, y:1*cellSize});
        x1_1.setAttributes({x:2.5*cellSize, y:1*cellSize, id:"x1_1"});
        plus1.setAttributes({x:3.5*cellSize, y:1*cellSize});
        four2.setAttributes({x:4.5*cellSize, y:1*cellSize});
        x2_1.setAttributes({x:5*cellSize, y:1*cellSize});
        equals1.setAttributes({x:6*cellSize, y:1*cellSize});
        five.setAttributes({x:7*cellSize, y:1*cellSize});

        // eqn2
        two.setAttributes({x:2*cellSize, y:2*cellSize});
        x1_2.setAttributes({x:2.5*cellSize, y:2*cellSize});
        plus2.setAttributes({x:3.5*cellSize, y:2*cellSize});
        minusFour.setAttributes({x:4.2*cellSize, y:2*cellSize});
        x2_2.setAttributes({x:5*cellSize, y:2*cellSize});
        equals2.setAttributes({x:6*cellSize, y:2*cellSize});
        one.setAttributes({x:7*cellSize, y:2*cellSize});

        // one.element.appendChild(
        //     createSVGElement("animate", {attributeName: "x", from: 7*cellSize, to: 10*cellSize, begin:"4s", dur:"3s", fill: "freeze"})
        // )
        // <animate attributeName="x" from="50" to="500" dur="5s" repeatCount="indefinite"/>

        // x1_1.setAttributes({x: 2*cellSize, y:5*cellSize});
        x1_2.element.append(
            createSVGElement("animate", {attributeName: "x", from: 2.5*cellSize, to: 2*cellSize, begin:"5s", dur:"3s", restart:"always",  fill: "freeze", repeatCount:"1"}),
            createSVGElement("animate", {attributeName: "y", from: 2*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", restart:"always", fill: "freeze", repeatCount:"1"})

        )
        x1_1.element.append(
            createSVGElement("animate", {attributeName: "x", from: 2.5*cellSize, to: 2*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 1*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "fill", from: "#000", to: "#fff", begin:"5s", dur:"1s", fill: "freeze"}),

        )
        four1.element.append(
            createSVGElement("animate", {attributeName: "x", from: 2*cellSize, to: 3*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 1*cellSize, to: 4.5*cellSize, begin:"5s", dur:"3s", fill: "freeze"})
        )
        two.element.append(
            createSVGElement("animate", {attributeName: "x", from: 2*cellSize, to: 3*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 2*cellSize, to: 5.5*cellSize, begin:"5s", dur:"3s", fill: "freeze"})
        )
        plus1.element.append(
            createSVGElement("animate", {attributeName: "x", from: 3.5*cellSize, to: 4*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 1*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "fill", from: "#000", to: "#fff", begin:"5s", dur:"1s", fill: "freeze"}),

        )
        plus2.element.append(
            createSVGElement("animate", {attributeName: "x", from: 3.5*cellSize, to: 4*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 2*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", fill: "freeze"})
        )
        
        x2_1.element.append(
            createSVGElement("animate", {attributeName: "x", from: 5*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 1*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "fill", from: "#000", to: "#fff", begin:"5s", dur:"1s", fill: "freeze"}),

        )
        x2_2.element.append(
            createSVGElement("animate", {attributeName: "x", from: 5*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 2*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", fill: "freeze"})
       
        )
        four2.element.append(
            createSVGElement("animate", {attributeName: "x", from: 4.5*cellSize, to: 6.2*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 1*cellSize, to: 4.5*cellSize, begin:"5s", dur:"3s", fill: "freeze"})
       
        )
        minusFour.element.append(
            createSVGElement("animate", {attributeName: "x", from: 4.2*cellSize, to: 6*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 2*cellSize, to: 5.5*cellSize, begin:"5s", dur:"3s", fill: "freeze"})
       
        )
        equals1.element.append(
            createSVGElement("animate", {attributeName: "x", from: 6*cellSize, to: 7*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 1*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "fill", from: "#000", to: "#fff", begin:"5s", dur:"1s", fill: "freeze"}),

        )
        equals2.element.append(
            createSVGElement("animate", {attributeName: "x", from: 6*cellSize, to: 7*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 2*cellSize, to: 5*cellSize, begin:"5s", dur:"3s", fill: "freeze"})
       
        )
        five.element.append(
            createSVGElement("animate", {attributeName: "x", from: 7*cellSize, to: 8*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 1*cellSize, to: 4.5*cellSize, begin:"5s", dur:"3s", fill: "freeze"})
       
        )
        one.element.append(
            createSVGElement("animate", {attributeName: "x", from: 7*cellSize, to: 8*cellSize, begin:"5s", dur:"3s", fill: "freeze"}),
            createSVGElement("animate", {attributeName: "y", from: 2*cellSize, to: 5.5*cellSize, begin:"5s", dur:"3s", fill: "freeze"})
       
        )
        // x2_1.setAttributes({x:5*cellSize, y:5*cellSize});
        // four2.setAttributes({x:6.2*cellSize, y:4.5*cellSize});
        // minusFour.setAttributes({x:6*cellSize, y:5.5*cellSize});
        // equals1.setAttributes({x:7*cellSize, y:5*cellSize});
        // five.setAttributes({x:8*cellSize, y:4.5*cellSize});
        // one.setAttributes({x:8*cellSize, y:5.5*cellSize});



        // x1_1.setAttributes({x: 2*cellSize, y: 1.5*cellSize});
        // four1.setAttributes({x: 3*cellSize, y: 1*cellSize});
        // two.setAttributes({x: 3*cellSize, y: 2*cellSize});
        // x1_1.setAttributes({x: 200, y: 100});
        
        const lines = [
            createSVGElement("line", {x1: 2.8*cellSize, y1: 3.8*cellSize, x2: 2.8*cellSize, y2: 5.7*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 2.8*cellSize, y1: 3.8*cellSize, x2: 3*cellSize, y2: 3.8*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 2.8*cellSize, y1: 5.7*cellSize, x2: 3*cellSize, y2: 5.7*cellSize, stroke: "white"}),

            createSVGElement("line", {x1: 3.8*cellSize, y1: 3.8*cellSize, x2: 3.8*cellSize, y2: 5.7*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 3.6*cellSize, y1: 3.8*cellSize, x2: 3.8*cellSize, y2: 3.8*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 3.6*cellSize, y1: 5.7*cellSize, x2: 3.8*cellSize, y2: 5.7*cellSize, stroke: "white"}),


            createSVGElement("line", {x1: 5.8*cellSize, y1: 3.8*cellSize, x2: 5.8*cellSize, y2: 5.7*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 5.8*cellSize, y1: 3.8*cellSize, x2: 6*cellSize, y2: 3.8*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 5.8*cellSize, y1: 5.7*cellSize, x2: 6*cellSize, y2: 5.7*cellSize, stroke: "white"}),

            createSVGElement("line", {x1: 6.8*cellSize, y1: 3.8*cellSize, x2: 6.8*cellSize, y2: 5.7*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 6.6*cellSize, y1: 3.8*cellSize, x2: 6.8*cellSize, y2: 3.8*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 6.6*cellSize, y1: 5.7*cellSize, x2: 6.8*cellSize, y2: 5.7*cellSize, stroke: "white"}),


            createSVGElement("line", {x1: 7.8*cellSize, y1: 3.8*cellSize, x2: 7.8*cellSize, y2: 5.7*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 7.8*cellSize, y1: 3.8*cellSize, x2: 8*cellSize, y2: 3.8*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 7.8*cellSize, y1: 5.7*cellSize, x2: 8*cellSize, y2: 5.7*cellSize, stroke: "white"}),

            createSVGElement("line", {x1: 8.8*cellSize, y1: 3.8*cellSize, x2: 8.8*cellSize, y2: 5.7*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 8.6*cellSize, y1: 3.8*cellSize, x2: 8.8*cellSize, y2: 3.8*cellSize, stroke: "white"}),
            createSVGElement("line", {x1: 8.6*cellSize, y1: 5.7*cellSize, x2: 8.8*cellSize, y2: 5.7*cellSize, stroke: "white"}),
        ]
        
        lines.forEach(elem => {
            elem.append(
                createSVGElement("animate", {attributeName: "stroke", from: "#fff", to: "#000", begin:"5s", dur:"3s", fill: "freeze"})
            )
        });
        
        grp.append(
            
            ...lines

        );
        
        grp.setAttribute("transform", "translate(80, 10)");
        t.svg.append(grp);

        setInterval(()=>{
        
        }, 6000)
        
        let startTime = null;
        function  animate(curTime){
            startTime = !startTime ? curTime : startTime;
            const elapsedTime = curTime - startTime;

            if(elapsedTime > 6000){
                const bs = t.querySelectorAll("animate");

                bs.forEach(element => {
                    element.beginElement();
                    // element.setAttribute("fill", "remove")
                })
                startTime = curTime;
            }

            requestAnimationFrame(animate);
            
        }

        requestAnimationFrame(animate);
        

        this.appendChild(this.container);
    }

    
}


customElements.define("mf-column-picture", ColumnPicture);