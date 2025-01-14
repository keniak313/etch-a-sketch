const body = document.querySelector("body");
const btn = document.querySelector("button");


let gridSizeX = 16;
let gridSizeY = 16;

let mouseDown = false;

createGrid();

btn.addEventListener("click", createGrid);

function createGrid () {
    const container = document.querySelector("#container");
    container.textContent = "";
    let y = 0;
    while(gridSizeY > y){
        y++;
        container.appendChild(createGridRow());
        console.log("Adding Row to Container")
    };
    console.log("Grid Created");
}

function createGridRow (){
    let x = 0;
    const gridRow = document.createElement("gridRow");

    while(gridSizeX > x){
        x++;
        const square = document.createElement("square");
        gridRow.appendChild(square);
        console.log("Adding Square to Row")
    };

    return gridRow;
}

document.addEventListener("click", e => {
    paint(e);
}, {passive: true});

document.addEventListener("mousemove", e => {
    if(mouseDown){paint(e);}
}, {passive: true});

function paint(e){
    let point = document.elementFromPoint(e.clientX, e.clientY);
    if(point.nodeName === "SQUARE"){
        point.classList.add("blackSquare");
    }
}

document.onmousedown = () => mouseDown = true;
document.onmouseup = () => mouseDown = false;
