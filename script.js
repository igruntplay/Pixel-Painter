// elements..
const inputRows = document.getElementById("rows");
const inputCols = document.getElementById("cols");
const inputSize = document.getElementById("size");
const refreshBtn = document.getElementById("refreshBtn");
const containerDiv = document.getElementById("container");
const inputForeColor = document.getElementById("foreColor");
const inputBackColor = document.getElementById("backColor");


document.getElementsByTagName("body")[0].addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

function getColor(type) {
    if (type == "fore") {
        return inputForeColor.value;
    } else if (type === "back") {
        return inputBackColor.value;
    }
}


function drawGrid() {

    //input values..
    let rows = inputRows.value;
    let cols = inputCols.value;
    let size = inputSize.value;

    containerDiv.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    containerDiv.innerHTML = "";

    for (let i = 0; i < rows * cols; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("grid-item");

        newDiv.setAttribute("draggable", "false");

        newDiv.style.width = `${size}px`;
        newDiv.style.height = `${size}px`;

        // when mouse enter..
        newDiv.addEventListener('mouseenter', function (ev) {
            if (ev.buttons === 1) {
                this.style.backgroundColor = getColor("fore");
            } else if (ev.buttons === 2) {
                this.style.backgroundColor = getColor("back");
            }
        });
        // when mouse down..
        newDiv.addEventListener('mousedown', function (ev) {
            if (ev.button === 0) {
                this.style.backgroundColor = getColor("fore");
            } else if (ev.button === 2) {
                this.style.backgroundColor = getColor("back");
            }
        });

        containerDiv.appendChild(newDiv);
    }
}



// handlers..


refreshBtn.addEventListener("click", function () {
    drawGrid();
});



// resize box..
inputSize.addEventListener("change", function () {
    let newSize = this.value;

    for (let i = 0; i < containerDiv.children.length; i++) {

        const box = containerDiv.children[i];

        box.style.width = `${newSize}px`;
        box.style.height = `${newSize}px`;
    }
});

drawGrid();