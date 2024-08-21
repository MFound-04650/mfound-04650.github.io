

export function createSVGElement(name, attribs={}){
    const NS = "http://www.w3.org/2000/svg";
    const elem = document.createElementNS(NS, name);
    for(const attr in attribs){
        elem.setAttribute(attr, attribs[attr]);
    }
    return elem;
}

export function createText(text, attribs){
    const textElement = createSVGElement("text");
    for(const attr in attribs){
        textElement.setAttribute(attr, attribs[attr]);
    }
    textElement.textContent = text;
    return textElement;
}

export function writeText(svg, text, attribs){
    const textElement = createText(text, attribs);
    svg.appendChild(textElement);
    return textElement;
}

class SVGElement{
    constructor(svg){
        this.svg = svg;
        this.attribs = {};
    }

    clear(){
        if(this.element)
        this.svg.removeChild(this.element);
    }

    build(){
        this.clear();
    }

    getHeight(){
        return this.element.getBBox().height;
    }
    getWidth(){
        return this.element.getBBox().width;
    }

    getX(){
        return parseFloat(this.element.getAttribute("x"));
    }
    getY(){
        return parseFloat(this.element.getAttribute("y"));
    }
    getNextRowPosition(offset){
        return this.getX()+this.getWidth()+offset;
    }
    getNextColumnPosition(offset){
        return this.getY()+this.getHeight()+offset;
    }

    setAttribute(name, value){
        this.element.setAttribute(name, value);
    }

    setAttributes(attribs){
        for(const attr in attribs){
            this.element.setAttribute(attr, attribs[attr]);
        }
    }
}

export class SVGTextElement extends SVGElement{
    constructor(svg, text, attribs){
        super();
        this.svg = svg;
        this.attribs = attribs;
        this.text = text;
        this.build();
    }

    build(){
        this.element = createSVGElement("text", this.attribs);
        this.element.innerHTML = this.text;
        this.svg.appendChild(this.element);
    }

    setText(text){
        this.element.innerHTML = text;
    }
 
    
}

export class SVGMatrixElement extends SVGElement{
    constructor(svg, {matrix=[[1,2,3],[1,22,333],[1,2,3]], x=0, y=0, cellSize=30, cellWidth=30, bracketColor="black", cellColor=null}){
        super(svg);
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.cellWidth = cellWidth;
        this.matrix = matrix;
        this.bracketColor = bracketColor;
        this.build();
    }

    build(){
        this.element = createSVGElement("g");
        this.svg.appendChild(this.element);
        this.buildBrackets();
        this.buildCells();
        this.element.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    }

    buildBrackets(){
        // left bracket
        const nrows = this.matrix.length;
        const ncols = this.matrix[0].length;
        const offset = 5;
        const y1 = 0-offset
        const y2 = nrows*this.cellSize;
        const leftBracket = [
            createSVGElement("line", {"x1":0, "y1":y1, "x2":0, "y2": y2, "stroke":this.bracketColor}),
            createSVGElement("line", {"x1":0, "y1":y1, "x2":offset, "y2": y1, "stroke":this.bracketColor}),
            createSVGElement("line", {"x1":0, "y1":y2, "x2":offset, "y2": y2, "stroke":this.bracketColor})
        ];
        const rightBracket = [
            createSVGElement("line", {"x1":ncols*this.cellWidth+offset, "y1":y1, "x2":ncols*this.cellWidth+offset, "y2": y2, "stroke":this.bracketColor}),
            createSVGElement("line", {"x1":ncols*this.cellWidth+offset, "y1":y1, "x2":ncols*this.cellWidth, "y2": y1, "stroke":this.bracketColor}),
            createSVGElement("line", {"x1":ncols*this.cellWidth+offset, "y1":y2, "x2":ncols*this.cellWidth, "y2": y2, "stroke":this.bracketColor})
        ];
        leftBracket.forEach(e=>this.element.appendChild(e));
        rightBracket.forEach(e=>this.element.appendChild(e));

    }

    setX(x){
        this.x = x;
        this.element.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    }

    setY(y){
        this.y = y;
        this.element.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    }

    setXY(pos){
        this.x = pos["x"];
        this.y = pos["y"];
        this.element.setAttribute("transform", `translate(${this.x}, ${this.y})`);
    }
    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    
    buildCells(){
        const nrows = this.matrix.length;
        const ncols = this.matrix[0].length;
        for(let i = 0; i<nrows; i++){
            for(let j=0; j<ncols; j++){
                const text = new SVGTextElement(
                    this.element, 
                    `${this.matrix[i][j]}`, 
                    {
                        x:(j*this.cellSize)+this.cellSize/2, 
                        y:(i*this.cellSize)+this.cellSize/2, 
                        "text-anchor":"middle",
                        fill:"blue"
                    }
                );
            }
        }

    }
}

export class SVGGridElement extends SVGElement{
    constructor(svg, cellSize=50){
        super(svg);
        this.cellSize = cellSize;
        this.build();
    }

    build(){
        //
        if(this.element) this.svg.removeChild(this.element);
        // this.svg.
        const width = this.svg.getAttribute("width");
        const height = this.svg.getAttribute("height");
        let lines = [];
        // horizontal
        let temp = 0;
        let level = height - temp;
        while(level > 0){
            lines.push(
                createSVGElement("line", {x1:0, y1:level, x2:width, y2:level, stroke:"rgba(0, 0, 0, 0.1)"})
            )
            temp += this.cellSize;
            level = height - temp;
        }
        // vertical
        temp = 0;
        level = width - temp;
        while(level > 0){
            lines.push(
                createSVGElement("line", {x1:level, y1:0, x2:level, y2:height, stroke:"rgba(0, 0, 0, 0.1)"})
            )
            temp += this.cellSize;
            level = width - temp;
        }

        this.element = createSVGElement("g");
        this.element.innerHTML = "";
        lines.forEach(e=>this.element.appendChild(e));
        this.svg.appendChild(this.element);
    }

    setCellSize(value){
        this.cellSize = value;
        this.build();
    }

}

export class SVGColumnVectorElement extends SVGElement{
    constructor(svg, {}){

    }
}

export class SVGRowVectorElement{

}