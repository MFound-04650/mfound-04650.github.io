import { SVGGridElement, createSVGElement } from "../../../utils/svg.js";
import { createPlane, draw2dLineIntersection, draw3dGrid } from "./utils.js";
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";


const geomInterpCSS = `
.geom-interp-svg {
    /*border: 2px solid black;*/
    margin-top: 10px;
    background-color: white;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12), 0 3px 1px -2px rgba(0, 0, 0, .2);
    
}

.geom-interp-container {
/*border: 2px solid black;*/
background-color: #eee;
padding-top: 10px;
width: 500px;
height: 550px;
display: flex;
flex-direction: column;
align-items: center;
margin-right: auto;
margin-left: auto;

}

.equation {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.input-box {
    width: 50px;
}
.unknown {
    margin-left: 5px;
}
.operator {
    margin-left: 5px;
    margin-right: 5px;
}
.equation-container {
    display: flex;
    align-items: flex-start;
    height: 80px;
}
.equation-choice {
    width: 100px;
    height: 50px;
    margin-top: 10px;
    margin-left: -100px;
    margin-right: 20px;
}
.equations-actual {
    margin-left: 0px;
    height: 200px;
    width: 200px;
    display: flex;
    flex-direction: column;
}
`
const equations2D = String.raw`
<div class="equation-container">
    <div class="equation-choice">
        <div class="equation-choice-val">
            <input type="radio" id="2d" name="dimension" value="dim2d" checked/>
            <label for="dim2d">2D</label>
        </div>
        <div class="equation-choice-val">
            <input type="radio" id="3d" name="dimension" value="dim3d"/>
            <label for="dim3d">3D</label>
        </div>
    </div>

    <div id="equations-2d" class="equations-actual">
        <div class="equation">
            <input class="input-box x1-1" id="x1-1" type="number"><span class="unknown">\(x_1\)</span> <span class="operator">+</span>
            <input class="input-box x2-1" id="x2-1" type="number"><span class="unknown">\(x_2\)</span> <span class="operator">=</span>
            <input class="input-box b1" id="b1" type="number">
        </div>
        <div class="equation">
            <input class="input-box x1-2" id="x1-2" type="number"><span class="unknown">\(x_1\)</span> <span class="operator">+</span>
            <input class="input-box x2-2" id="x2-2" type="number"><span class="unknown">\(x_2\)</span> <span class="operator">=</span>
            <input class="input-box b2" id="b2" type="number">
        </div>
        <div class="equation">

        </div>

    </div>

    <div id="equations-3d" class="equations-actual">
        <div class="equation">
            <input class="input-box x1-1" id="x1-1" type="number"><span class="unknown">\(x_1\)</span> <span class="operator">+</span>
            <input class="input-box x2-1" id="x2-1" type="number"><span class="unknown">\(x_2\)</span> <span class="operator">+</span>
            <input class="input-box x3-1" id="x3-1" type="number"><span class="unknown">\(x_3\)</span> <span class="operator">=</span>
            <input class="input-box b1" id="b1" type="number">
        </div>
        <div class="equation">
            <input class="input-box x1-2" id="x1-2" type="number"><span class="unknown">\(x_1\)</span> <span class="operator">+</span>
            <input class="input-box x2-2" id="x2-2" type="number"><span class="unknown">\(x_2\)</span> <span class="operator">+</span>
            <input class="input-box x3-2" id="x3-2" type="number"><span class="unknown">\(x_3\)</span> <span class="operator">=</span>
            <input class="input-box b2" id="b2" type="number">
        </div>
        <div class="equation">
            <input class="input-box x1-3" id="x1-3" type="number"><span class="unknown">\(x_1\)</span> <span class="operator">+</span>
            <input class="input-box x2-3" id="x2-3" type="number"><span class="unknown">\(x_2\)</span> <span class="operator">+</span>
            <input class="input-box x3-3" id="x3-3" type="number"><span class="unknown">\(x_3\)</span> <span class="operator">=</span>
            <input class="input-box b3" id="b3" type="number">
        </div>

    </div>
</div>
`

export default class GeometricInterp extends HTMLElement{

    constructor(){
        super();
        this.state = {
            eqn2d: [[4, 4, 5],[2, -4, 1]],
            eqn3d: [[4, 4, 0, 5],[2, -4, 0, 1], [5, -4, 0, 1]],
            is2d: true,
        }
    }

    connectedCallback(){
        console.log("GeometricInterp");
        // main container
        this.container = document.createElement("div");
        this.container.className = "geom-interp-container";

        // styles
        const styles = document.createElement("style");
        styles.innerHTML = geomInterpCSS

        // equation
        const equationContainer = document.createElement("div");
        // const equantion2d 
        equationContainer.innerHTML = equations2D;
        this.equation = equationContainer;

        // svg
        this.svg = createSVGElement("svg", {width:400, height:400});
        this.svg.setAttribute("class", "geom-interp-svg");

        // 3d renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(400, 400);
        this.renderer.setClearColor(0xffffff, 1)
        
        // add to component
        this.container.append(styles, this.equation, this.svg);
        this.appendChild(this.container);
        MathJax.typeset();

        // handle equation logic
        this.handleEquations();
        
    }

    handleEquations(){
        const t = this;
        // 2d inputs
        const a11Elem2d = this.equation.querySelector("#equations-2d .x1-1");
        const a12Elem2d = this.equation.querySelector("#equations-2d .x2-1");
        const a21Elem2d = this.equation.querySelector("#equations-2d .x1-2");
        const a22Elem2d = this.equation.querySelector("#equations-2d .x2-2");
        const b1Elem2d  = this.equation.querySelector("#equations-2d .b1");
        const b2Elem2d  = this.equation.querySelector("#equations-2d .b2");

        // 3d inputs
        const a11Elem3d = this.equation.querySelector("#equations-3d .x1-1");
        const a12Elem3d = this.equation.querySelector("#equations-3d .x2-1");
        const a13Elem3d = this.equation.querySelector("#equations-3d .x3-1");
        const a21Elem3d = this.equation.querySelector("#equations-3d .x1-2");
        const a22Elem3d = this.equation.querySelector("#equations-3d .x2-2");
        const a23Elem3d = this.equation.querySelector("#equations-3d .x3-2");
        const a31Elem3d = this.equation.querySelector("#equations-3d .x1-3");
        const a32Elem3d = this.equation.querySelector("#equations-3d .x2-3");
        const a33Elem3d = this.equation.querySelector("#equations-3d .x3-3");
        const b1Elem3d  = this.equation.querySelector("#equations-3d .b1");
        const b2Elem3d  = this.equation.querySelector("#equations-3d .b2");
        const b3Elem3d = this.equation.querySelector("#equations-3d .b3");


        
        const equations2dDiv = this.equation.querySelector("#equations-2d");
        const equations3dDiv = this.equation.querySelector("#equations-3d");
        equations3dDiv.style.display = "None";
        console.log(equations2dDiv);

        const inputRadio = document.querySelectorAll('input[name="dimension"]');
        inputRadio.forEach(e => {
            e.addEventListener("change", ee => {
                if(ee.target.value == "dim2d") t.state.is2d = true;
                else t.state.is2d = false;
                if(t.state.is2d) {
                    equations3dDiv.style.display = "None";
                    equations2dDiv.style.display = "block";
                }
                else {
                    equations2dDiv.style.display = "None";
                    equations3dDiv.style.display = "block";
                }
                t.drawEquations();
            })
        });

        function handleInputElem(elem, state, a, b){
            elem.value = state[a][b];
            elem.addEventListener("input", ee=>{
            state[a][b] = elem.value;
            t.drawEquations();
        });
        }

        handleInputElem(a11Elem2d, this.state.eqn2d, 0,0);
        handleInputElem(a12Elem2d, this.state.eqn2d, 0,1);
        handleInputElem(a21Elem2d, this.state.eqn2d, 1, 0);
        handleInputElem(a22Elem2d, this.state.eqn2d, 1, 1);
        handleInputElem(b1Elem2d, this.state.eqn2d, 0, 2);
        handleInputElem(b2Elem2d, this.state.eqn2d, 1, 2);

        handleInputElem(a11Elem3d, this.state.eqn3d, 0, 0);
        handleInputElem(a12Elem3d, this.state.eqn3d, 0, 1);
        handleInputElem(a13Elem3d, this.state.eqn3d, 0, 2);
        handleInputElem(b1Elem3d, this.state.eqn3d, 0, 3);

        handleInputElem(a21Elem3d, this.state.eqn3d, 1, 0);
        handleInputElem(a22Elem3d, this.state.eqn3d, 1, 1);
        handleInputElem(a23Elem3d, this.state.eqn3d, 1, 2);
        handleInputElem(b2Elem3d, this.state.eqn3d, 1, 3);

        handleInputElem(a31Elem3d, this.state.eqn3d, 2, 0);
        handleInputElem(a32Elem3d, this.state.eqn3d, 2, 1);
        handleInputElem(a33Elem3d, this.state.eqn3d, 2, 2);
        handleInputElem(b3Elem3d, this.state.eqn3d, 2, 3);

        this.drawEquations();
    }

    drawEquations(){
        if(this.state.is2d){
            this.draw2Equations();
        }
        else{
            this.draw3Equations();
        }
    }

    draw2Equations(){
        // Include svg
        this.renderer.domElement.remove();
        this.container.appendChild(this.svg);
        
        // // get input elements
        // const a11Elem = document.querySelector("#equations-2d .x1-1");
        // const a12Elem = document.querySelector("#equations-2d .x2-1");
        // const a21Elem = document.querySelector("#equations-2d .x1-2");
        // const a22Elem = document.querySelector("#equations-2d .x2-2");

        // assign values from input elements to state
        // this.state.eqn2d[0][0] = parseFloat(a11Elem.value);
        // this.state.eqn2d[0][1] = parseFloat(a12Elem.value);
        // this.state.eqn2d[1][0] = parseFloat(a21Elem.value);
        // this.state.eqn2d[1][1] = parseFloat(a22Elem.value);

        const svg = this.svg;
        svg.innerHTML = "";
        const eqn1 = this.state.eqn2d[0];
        const eqn2 = this.state.eqn2d[1];
        let grid = new SVGGridElement(svg, 50);
        draw2dLineIntersection(grid, eqn1, eqn2, {fontSize: 18});
    }

    draw3Equations(){
        // create a renderer

        const t = this;
        this.svg.remove();
        this.container.appendChild(this.renderer.domElement);

        const scene = new THREE.Scene();

        // orthographic camera
        // const aspect = 1;
        // const frustumSize = 10;
        // const camera = new THREE.OrthographicCamera(
        // -frustumSize * aspect / 2, frustumSize * aspect / 2,
        // frustumSize / 2, -frustumSize / 2,
        // 0.1, 1000
        // );
        // perspective camera
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const orbit = new OrbitControls(camera, this.renderer.domElement);
        const axesHelper = new THREE.AxesHelper(6);
        scene.add(axesHelper);
        camera.position.z = 5;
        camera.position.x = 1;
        camera.position.set(0, 2, 5);
        orbit.update();

        draw3dGrid(scene);
        const a = 4, b=4, c=0, d=0;
        const plane1 = createPlane(...this.state.eqn3d[0], "#0000ff", {width:10, height:10});
        const plane2 = createPlane(...this.state.eqn3d[1], "#ff0000", {width:10, height:10});
        const plane3 = createPlane(...this.state.eqn3d[2], "#00ff00", {width:10, height:10});
        scene.add(plane1);
        scene.add(plane2);
        scene.add(plane3);


        function animate(){
            
            t.renderer.render(scene, camera);
        }
        this.renderer.setAnimationLoop(animate);
    }
}


customElements.define("mf-geom-interp", GeometricInterp);