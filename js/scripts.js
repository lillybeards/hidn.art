// image gallery hover
document.addEventListener("DOMContentLoaded", function () {
    var imageContainers = document.querySelectorAll(".image-container");

    imageContainers.forEach(function (container) {
        var caption = container.querySelector(".caption");
        var originalCaption = caption.textContent;
        var hoverCaption = caption.getAttribute("data-hover-caption");

        container.addEventListener("mouseenter", function () {
            caption.textContent = hoverCaption;
        });

        container.addEventListener("mouseleave", function () {
            caption.textContent = originalCaption;
        });
    });
});
// end of image gallery hover

// canvas
const canvas = document.getElementById('drawingCanvas'); //sets up canvas as a variable and links it to the drawingCanvas element in the HTML
const ctx = canvas.getContext('2d'); //ctx is a variable - 2D rendering context 

canvas.width = window.innerWidth * 0.6; 
canvas.height = window.innerHeight * 0.6;

let drawing = false; //tracks whether the user is drawing - defaults to 'false' when page loads
let color = document.getElementById('colorPicker').value; //links to colour picker in HTML; selects the colour from user input and stores in the variable 'color'
let brushSize = document.getElementById('brushSize').value; //as above but for the brush size slider

let undoStack = []; // to store canvas states

document.getElementById('colorPicker').addEventListener('input', (event) => {
    color = event.target.value;
}); //checks for a user input/change on the colour picker

document.getElementById('brushSize').addEventListener('input', (event) => {
    brushSize = event.target.value;
}); //as above for brush size

canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    saveState();
    draw(event);
}); //checks for user input pressing mouse over canvas; if the mouse is clicked, drawing has started so the draw function is called

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
}); //as above but stops drawing if user lets go of click

canvas.addEventListener('mousemove', draw); //draws when mouse is moved, allowing continuous drawing

document.getElementById('clearButton').addEventListener('click', () => {
    saveState();
    clearCanvas();
}); //if the clear button is clicked, canvas clears to default and fills with a white colour

document.getElementById('undoButton').addEventListener('click', undo); // undo button event listener
document.getElementById('saveButton').addEventListener('click', saveImage); // save button event listener

// Touch event listeners for mobile devices
canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    drawing = true;
    saveState();
    drawTouch(event);
});

canvas.addEventListener('touchend', () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    drawTouch(event);
});

// initial canvas setup to fill with white background
clearCanvas();

function draw(event) { 
    if (!drawing) return; //checks if drawing has been activated by the listeners above

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round'; //rounded brush - could add an option for user selection of brush type?
    ctx.strokeStyle = color;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineTo(x, y); //creates a line following the mouse position
    ctx.stroke(); //actually draws the line
    ctx.beginPath(); //starts a new path when mouse lifted/clicked, to stop the lines being connected 
    ctx.moveTo(x, y); //moves drawing position to current mouse position
}

function drawTouch(event) {
    if (!drawing) return;

    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function saveState() {
    undoStack.push(canvas.toDataURL());
}

function undo() {
    if (undoStack.length > 0) {
        let canvasPic = new Image();
        canvasPic.src = undoStack.pop();
        canvasPic.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
            ctx.drawImage(canvasPic, 0, 0); // draw the previous state
        }
    }
}

function saveImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.8);
    link.download = 'drawing.jpg';
    link.click();
}

function clearCanvas() {
    ctx.fillStyle = "#FFFFFF"; // set fill color to white
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fill the entire canvas with white
}

// Enables fruit images to change/invert at click of a button
function imagefun() {
    var ReverseImage = document.getElementById(".container-fluid-reverse img");
        if (ReverseImage.src.match(".images/fruit-basket.jpg")) {
            ReverseImage.src = (".images/fruit-basket-rev.jpg")
        }
        else {
            ReverseImage.src = (".images/fruit-basket.jpg")
        }
    }

