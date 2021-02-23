'use strict';

const imageFile = document.querySelector('.upload-image');
const imageBox = document.querySelector('.board__image');
const menuBar = document.querySelector('.menu__options');
const textBtn = document.querySelector('.option-text');
const textContainer = document.querySelector('.board__text');
let selectedTextBox = null;
const backgroudBox = document.querySelector('.board__background');
const colorBtn = document.querySelector('.color__colors');
const sizeBtn = document.querySelector('.size');
const fontBtn = document.querySelector('.font__style');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let active = null;
let curX, curY, prevX, prevY = null;
let drawing = false;
let textMoving = false;
let erasing = false;
let color = 'black';
let textSize = '';
let drawSize = '';
let eraserSize = '';

imageFile.addEventListener('change', () => {
    const reader = new FileReader();    
    reader.addEventListener('load', () => {
    //console.log(reader.result);
    //const image = document.querySelector('.imagePreview').setAttribute('src', reader.result);
    /* image.src = reader.result;
    image.addEventListener('load', () => {
        context.drawImage(image, 300,200);
    }) */
        imageBox.src = reader.result;
        menuBar.style.display = 'block';
    })
    const textContainerX = imageBox.getBoundingClientRect().left;
    textContainer.style.left = `${textContainerX}px`;
    reader.readAsDataURL(imageFile.files[0])
})

menuBar.addEventListener('click', (event) => {
    active = event.target.getAttribute('data-menu');

    if (active === 'text') {
        const textBox = document.createElement('textarea');
        textBox.setAttribute('class', 'text-box');

        textBox.style.position = 'absolute';
        textBox.style.left = '0';

        textContainer.append(textBox);
    }

})
textContainer.addEventListener('mousedown', (event) => {
    selectedTextBox = event.target;
    textMoving = true;
})
textContainer.addEventListener('mouseup', (event) => {
    textMoving = false;
})

canvas.addEventListener('mousedown', (event) => {
    if (active === 'draw' || active === 'erase' ) {
        curX = event.layerX;
        curY = event.layerY;
        drawing = true;
        erasing = true;
    }


});
canvas.addEventListener('mousemove', (event) => {
    let coordinateX = event.layerX;
    let coordinateY = event.layerY;
    switch (active) {
        case 'draw': {
            if (drawing) {
                prevX = curX;
                prevY = curY;
                curX = coordinateX;
                curY = coordinateY;
                context.lineWidth = drawSize;
                context.strokeStyle = color;
                context.lineCap = 'round';
                context.beginPath();
                context.moveTo(prevX, prevY);
                context.lineTo(curX, curY);
                context.stroke();
            }
            break;
        };
        case 'erase': {
            if (erasing) {
                context.globalCompositeOperation = 'destination-out';
                prevX = curX;
                prevY = curY;
                curX = coordinateX;
                curY = coordinateY;
                context.lineWidth = eraserSize;
                context.lineCap = 'round';
                context.beginPath();
                context.moveTo(prevX, prevY);
                context.lineTo(curX, curY);
                context.stroke();
            }
            break;
        };
        case 'text': {
            if (textMoving && selectedTextBox) {
                selectedTextBox.style.transform = `translate(${coordinateX}px,${coordinateY}px)`;
            }
        };
        case 'background': ;
        default: ;
    }
});
canvas.addEventListener('mouseup', () => {
    drawing = false;
    erasing = false;
});

colorBtn.addEventListener('click', (event) => {
    color = event.target.getAttribute('data-color');
    if (color) {
        switch (active) {
            case 'draw': {
                if (drawing) {
                    context.strokeStyle = color;
                }
                break;
            };
            case 'text': {
                if (selectedTextBox) {
                    selectedTextBox.style.color = color;
                }
                break;
            };
            case 'background': {
                backgroudBox.style.backgroundColor = color;
                break;
            };
            default: ;
        }
    }
    
});

sizeBtn.addEventListener('click', (event) => {
    const size = event.target.getAttribute('data-size');
    switch (size) {
        case 'micro1':
            drawSize = 1;
            eraserSize = 3;
            textSize = '15px';
            break;
        case 'micro2':
            drawSize = 3;
            eraserSize = 5;
            textSize = '20px';
            break;
        case 'small1':
            drawSize = 5;
            eraserSize = 10;
            textSize = '25px';
            break;
        case 'small2':
            drawSize = 8;
            eraserSize = 14;
            textSize = '30px';
            break;
        case 'medium1':
            drawSize = 10;
            eraserSize = 17;
            textSize = '35px';
            break;
        case 'medium2':
            drawSize = 12;
            eraserSize = 20;
            textSize = '37px';
            break;
        case 'large1':
            drawSize = 15;
            eraserSize = 25;
            textSize = '40px';
            break;
        case 'large2':
            drawSize = 17;
            eraserSize = 30;
            textSize = '45px';
            break;
        case 'great1':
            drawSize = 19;
            eraserSize = 35;
            textSize = '50px';
            break;
        case 'great2':
            drawSize = 20;
            eraserSize = 40;
            textSize = '55px';
            break;
        default: break;
    }
    if (active === 'text')
        selectedTextBox.style.fontSize = textSize;
});
fontBtn.addEventListener('click', (event) => {
    const font = event.target.getAttribute('data-style');
    let fontFamily = null;
    switch (font) {
        case 'potta':
            fontFamily = `'Potta One', cursive`;
            break;
        case 'lonrina':
            fontFamily = `'Londrina Solid', cursive`;
            break;
        case 'hachi':
            fontFamily = `'Hachi Maru Pop', cursive`;
            break;
        case 'hanalei':
            fontFamily = `'Hanalei', cursive`;
            break;
        case 'shadows':
            fontFamily = `'Shadows Into Light', cursive`;
            break;
        case 'Ballet':
            fontFamily = `'Ballet', cursive`;
            break;
        case 'Libre':
            fontFamily = `'Libre Franklin', sans-serif`;
            break;
        case 'Long':
            fontFamily = `'Long Cang', cursive`;
            break;
        case 'Reggae':
            fontFamily = `'Reggae One', cursive`;
            break;

        case 'Nanum':
            fontFamily = `'Nanum Myeongjo', serif`;
            break;
        default: break;
    }
    selectedTextBox.style.fontFamily = fontFamily;

})