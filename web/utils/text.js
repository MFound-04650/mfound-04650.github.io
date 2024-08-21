

export function renderColumnVector(context, x, y, ...elements){
    const textWidth = context.measureText(""+elements[0]).width
    const height = textWidth * elements.length
    console.log(elements);

    context.beginPath();
    context.strokeStyle = "black";
    context.moveTo(x+10, y);
    context.lineTo(x, y);
    context.lineTo(x, y+height);
    context.lineTo(x+10,y+height);
    context.stroke();

    context.beginPath();
    context.font = "18px Arial";
    context.fillStyle = "black";
    context.fillText(""+elements[0], x, y);
    context.tex
    

}