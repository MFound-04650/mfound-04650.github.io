import { SVGMatrixElement, SVGTextElement, createSVGElement } from "../../../utils/svg.js";
import * as THREE from "three";


export function draw2dLineIntersection(grid, eqn1, eqn2, {fontSize=20, eqn1Color="blue", eqn2Color="red"}){
    const svg = grid.svg;
    const width = svg.getAttribute("width");
    const height = svg.getAttribute("height");
    const offset = 10;
    const cellSize = grid.cellSize;
    const eqn1_text = new SVGTextElement(
        svg, `${eqn1[0]}x<tspan font-size="${parseInt(fontSize/2)}" baseline-shift="sub">1</tspan> + 
        ${eqn1[1]}x<tspan font-size="${parseInt(fontSize/2)}" baseline-shift="sub">2</tspan> = ${eqn1[2]}`, {"font-size":fontSize, "fill":eqn1Color}
    );
    const eqn2_text = new SVGTextElement(
        svg, `${eqn2[0]}x<tspan font-size="${parseInt(fontSize/2)}" baseline-shift="sub">1</tspan> + 
        ${eqn2[1]}x<tspan font-size="${parseInt(fontSize/2)}" baseline-shift="sub">2</tspan> = ${eqn2[2]}`, {"font-size":fontSize, "fill":eqn2Color}
    );

    const eqn1_box = eqn1_text.element.getBBox();
    const eqn2_box = eqn2_text.element.getBBox();
    
    eqn1_text.setAttributes({x: width-eqn1_box.width-offset, y:eqn1_box.height});
    eqn2_text.setAttributes({x: width-eqn2_box.width-offset, y:eqn1_box.height+eqn2_box.height+offset});

    // draw axes
    let midX = (width/cellSize)/2;
    let midY = (height/cellSize)/2;
    const yLine = createSVGElement("line", {x1:midX*cellSize, y1:0, x2:midX*cellSize, y2:height, stroke:"rgba(0,0,0,0.5)"});
    const xLine = createSVGElement("line", {x1:0, y1:midY*cellSize, x2:width, y2:midY*cellSize, stroke:"rgba(0,0,0,0.5)"});
    const yLabel = new SVGTextElement(
        svg, `x<tspan font-size=${parseInt(fontSize/2)} baseline-shift="sub">2</tspan>`, {"font-size":fontSize}
    );
    const xLabel = new SVGTextElement(
        svg, `x<tspan font-size=${parseInt(fontSize/2)} baseline-shift="sub">1</tspan>`, {"font-size":fontSize}
    )
    xLabel.setAttributes(
        {
            "x": width - xLabel.element.getBBox().width,
            "y": midY*cellSize + xLabel.element.getBBox().height
        }
    )
    yLabel.setAttributes(
        {
            "x": midX*cellSize - yLabel.element.getBBox().width,
            "y": yLabel.element.getBBox().height
        }
    )
    grid.element.appendChild(yLine);
    grid.element.appendChild(xLine);

    // draw line for eqn 1
    let gridWidth = parseInt(width/cellSize)
    let x1 = -gridWidth;
    let x2 = gridWidth;
    let y1 = eqn1[1] != 0 ? (eqn1[2] - eqn1[0]*x1)/eqn1[1] : 0
    let y2 = eqn1[1] != 0 ? (eqn1[2] - eqn1[0]*x2)/eqn1[1] : 0
    if(eqn1[1] == 0){
        x1 = eqn1[2]/eqn1[0];
        x2 = x1;
        y1 = -10;
        y2 = 10;
    }
    console.log([x1, y1, x2, y2]);
    const line1 = createSVGElement("line", {
        x1:x1*cellSize, y1:y1*cellSize, x2:x2*cellSize, y2:y2*cellSize, stroke:eqn1Color 
    })
    line1.setAttribute("transform", `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`);
    grid.element.appendChild(line1);


    // draw line for eqn2
    y1 = eqn2[1] != 0 ? (eqn2[2] - eqn2[0]*x1)/eqn2[1] : 0
    y2 = eqn2[1] != 0 ? (eqn2[2] - eqn2[0]*x2)/eqn2[1] : 0
    if(eqn2[1] == 0){
        x1 = eqn2[2]/eqn2[0];
        x2 = x1;
        y1 = -10;
        y2 = 10;
    }
    const line2 = createSVGElement("line", {
        x1:x1*cellSize, y1:y1*cellSize, x2:x2*cellSize, y2:y2*cellSize, stroke:eqn2Color 
    })
    console.log([x1, y1, x2, y2]);
    line2.setAttribute("transform", `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`);
    grid.element.appendChild(line2);
    console.log([midX*cellSize, midY*cellSize]);

    // draw intersection point
    let cx = (eqn1[1]*eqn2[2] - eqn2[1]*eqn1[2])/(eqn1[1]*eqn2[0] - eqn1[0]*eqn2[1]);
    let cy = (eqn1[2] - eqn1[0]*cx)/eqn1[1];
    if(isNaN(cy)){
        cy = (eqn2[2] - eqn2[0]*cx)/eqn2[1];
    }
    if(isFinite(cx) && isFinite(cy)){
    const point = createSVGElement("circle", {cx:cx*cellSize, cy:cy*cellSize, r:"4", fill:"black"});
    point.setAttribute("transform", `translate(${midX*cellSize}, ${midY*cellSize}) scale(1, -1)`);
    const label = new SVGTextElement(svg, `(${cx.toFixed(2)}, ${cy.toFixed(2)})`, {x:cx*cellSize, y:-cy*cellSize});
    label.setAttributes({"transform":`translate(${midX*cellSize}, ${midY*cellSize})`});
    console.log([cx, cy])
    grid.element.appendChild(point);
    }

    
}

export function draw2dVectorCombination(svg, eqn1, eqn2){
    const matrixOffset = 10;
    const leftMargin = 10;

        
    const vector1 = new SVGMatrixElement(
        svg, 
        {
            matrix:[[eqn1[0]],[eqn2[0]]]
        }
    )
    const x1 = new SVGTextElement(
        svg, 
        `x<tspan font-size="10" baseline-shift="sub">1</tspan>`, 
        {x:leftMargin, y:vector1.getHeight()/2}
    );
    // vector1.setAttributes({x:x1.element.getAttribute("x")+x1.element.getBBox().width+matrixOffset});
    vector1.setX(x1.getNextRowPosition(10));
    vector1.setY(matrixOffset);
    const plus = new SVGTextElement(
        svg, 
        `+`,
        {x:vector1.getNextRowPosition(10), y:vector1.getHeight()/2}
    )
    const x2 = new SVGTextElement(
        svg, 
        `x<tspan font-size="10" baseline-shift="sub">2</tspan>`, 
        {x:plus.getNextRowPosition(10), y:vector1.getHeight()/2}
    );
    const vector2 = new SVGMatrixElement(
        svg, 
        {
            matrix:[[eqn1[1]],[eqn2[1]]]
        }
    )
    vector2.setX(x2.getNextRowPosition(10));
    vector2.setY(matrixOffset);
    const equals = new SVGTextElement(
        svg, 
        `=`,
        {
            x:vector2.getNextRowPosition(10), 
            y:vector1.getHeight()/2
        }
    )
    const vector3 = new SVGMatrixElement(
        svg, 
        {
            matrix:[[eqn1[2]],[eqn2[2]]]
        }
    )
    vector3.setX(equals.getNextRowPosition(10));
    vector3.setY(matrixOffset);
    
    // sol
    let cx = (eqn1[1]*eqn2[2] - eqn2[1]*eqn1[2])/(eqn1[1]*eqn2[0] - eqn1[0]*eqn2[1]);
    let cy = (eqn1[2] - eqn1[0]*cx)/eqn1[1];
    if(isNaN(cy)){
        cy = (eqn2[2] - eqn2[0]*cx)/eqn2[1];
    }

    const sol = new SVGTextElement(
        svg,
        `x<tspan font-size="10" baseline-shift="sub">1</tspan> = ${cx.toFixed(2)}, 
        x<tspan font-size="10" baseline-shift="sub">2</tspan> = ${cy.toFixed(2)}`, 
        {x: leftMargin, y:vector3.getNextColumnPosition(30)}
    );



    const vectormult1 = new SVGMatrixElement(
        svg,
        {
            matrix: [[`${cx.toFixed(2)}*${eqn1[0]}`],[`${cx.toFixed(2)}*${eqn2[0]}`]],
            x: leftMargin,
            y: sol.getNextColumnPosition(10),
            cellSize:60,
            cellWidth:60,
        }
    )

    const plus_ = new SVGTextElement(
        svg, 
        `+`,
        {
            x:vectormult1.getNextRowPosition(10), 
            y:sol.getNextColumnPosition(10)+vectormult1.getHeight()/2,
        }
    )

    const vectormult2 = new SVGMatrixElement(
        svg,
        {
            matrix: [[`${cy.toFixed(2)}*${eqn1[1]}`],[`${cy.toFixed(2)}*${eqn2[1]}`]],
            cellWidth:60,
            cellSize:60,
            x: plus_.getNextRowPosition(10),
            y: sol.getNextColumnPosition(10)
        }
    )

    const equals_ = new SVGTextElement(
        svg, 
        `=`,
        {
            x:vectormult2.getNextRowPosition(10), 
            y:sol.getNextColumnPosition(10)+vectormult1.getHeight()/2,
        }
    )

    const vector3_ = new SVGMatrixElement(
        svg,
        {
            matrix: [[`${eqn1[2]}`],[`${eqn2[2]}`]],
            cellWidth:60,
            cellSize:60,
            x: equals_.getNextRowPosition(10),
            y: sol.getNextColumnPosition(10)
        }
    )


    
    
    
    
    
    
}

function createLine(point1, point2){
    let points = [];
    points.push(new THREE.Vector3(...point1));
    points.push(new THREE.Vector3(...point2));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ 
        color: "#000000", 
        transparent: true,
        opacity: 0.1
    }); 
    const line = new THREE.Line(geometry, material);
    return line;
}
export function draw3dGrid(scene){

    for(let i=-6; i <= 6; i++){

        scene.add(createLine([-6, 0, i], [6, 0, i]));
        scene.add(createLine([0, -6, i], [0, 6, i]));

        scene.add(createLine([i, 0, -6], [i, 0, 6]));
        scene.add(createLine([i, -6, 0], [i, 6, 0]));

        scene.add(createLine([0, i, -6], [0, i, 6]));
        scene.add(createLine([-6, i, 0], [6, i, 0]));
    }

}

export function createPlane(x, y, z, c, color, {width=6, height=6, opacity=0.2}){
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide, transparent: true, opacity: opacity });
    const plane = new THREE.Mesh(geometry, material);
    const normal = new THREE.Vector3(x, y, z).normalize();
    plane.lookAt(normal);
    console.log(normal.x);
    plane.position.set(normal.x * c, normal.y * c, normal.z * c);
    return plane;
}

