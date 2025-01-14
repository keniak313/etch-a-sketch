const body = document.querySelector("body");
const btn = document.querySelector("button");
const canvas = document.querySelector(".canvas");
const slider = document.querySelector("#slider.slider");
const sliderInfo = document.querySelector("#slider.info");
const gridCheckBox = document.querySelector(".showGrid");
const colorPicker = document.querySelector(".colorPicker");


let gridSizeX = 16;
let gridSizeY = 16;

let mouseDown = false;

//Show Grid
gridCheckBox.addEventListener("click", () => {
    if(gridCheckBox.checked){
        canvas.childNodes.forEach((child) => {child.childNodes.forEach((node) => node.classList.add("showGrid"))})
    }else{
        canvas.childNodes.forEach((child) => {child.childNodes.forEach((node) => node.classList.remove("showGrid"))})
    }
}
);

colorPicker.addEventListener("mousedown", () => console.log(colorPicker.value));
let paintColor = colorPicker.value;


//Change grid size based on slider
slider.value = gridSizeX;
sliderInfo.textContent = "Grid size: " + slider.value;

slider.addEventListener("input", () =>{
    gridSizeX = slider.value;
    gridSizeY = slider.value;
    sliderInfo.textContent = "Grid size: " + slider.value;
    createGrid();
});

//Grid creation
createGrid();

btn.addEventListener("click", createGrid);

function createGrid () {
    canvas.textContent = "";
    let y = 0;
    while(gridSizeY > y){
        y++;
        canvas.appendChild(createGridRow());
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
        square.style = "opacity: 1; background: white";
        if(gridCheckBox.checked){
            square.classList.add("showGrid");
        };
        gridRow.appendChild(square);
        console.log("Adding Square to Row")
    };

    return gridRow;
}

//Painting on Canvas
canvas.addEventListener("click", (e) => {
    paint(e);
    //e.preventDefault();
}, {passive: true});

canvas.addEventListener("mousemove", (e) => {
    if(mouseDown){paint(e);}
    //e.preventDefault();
}, {passive: true});

let op = 0.5;

function paint(e){
    let point = document.elementFromPoint(e.clientX, e.clientY);
    if(point.nodeName === "SQUARE"){
        point.style.background = colorPicker.value;
        //changeOpacity(point);
    }
}

function changeOpacity(point) {
    let curOpacity = 0;
    let newOpacity = 0;
    curOpacity = point.style.getPropertyValue("opacity");
    newOpacity = curOpacity - 0.1;
    point.style.opacity = newOpacity;
    return point;
}

canvas.onmousedown = (e) => {mouseDown = true; e.preventDefault()};
canvas.onmouseup = (e) => {mouseDown = false; e.preventDefault()};
