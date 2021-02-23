'use strict';

const imageFile = document.querySelector('.upload-image');
const imageBox = document.querySelector('.board__image');
const menuBar = document.querySelector('.menu__options');
const textBtn = document.querySelector('.option-text');
const textContainer = document.querySelector('.board__text');
let selectedTextBox = null;
const backgroudBox = document.querySelector('.board__background');
const colorBtn = document.querySelector('.color__colors');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let active = null;
let curX, curY, prevX, prevY = null;
let drawing = false;
let textMoving = false;
let color = 'black';

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
    if (active === 'draw') {
        curX = event.layerX;
        curY = event.layerY;
        drawing = true;
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
                context.strokeStyle = color;
                context.lineCap = 'round';
                context.beginPath();
                context.moveTo(prevX, prevY);
                context.lineTo(curX, curY);
                context.stroke();
            }
            break;
        } ;
        case 'erase': {
            context.globalCompositeOperation = 'destination-out';
            prevX = curX;
            prevY = curY;
            curX = coordinateX;
            curY = coordinateY;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(prevX, prevY);
            context.lineTo(curX, curY);
            context.stroke();
            break;
        };
        case 'text': {
            if(textMoving && selectedTextBox){
                selectedTextBox.style.transform = `translate(${coordinateX}px,${coordinateY}px)`;
            }
        };
        case 'background': ;
        default: ;
    }
});
canvas.addEventListener('mouseup', () => {
    drawing = false;
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
    
})