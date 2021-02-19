'use strict';

const imageFile = document.querySelector('.upload-image');
const imageBox = document.querySelector('.board__image');
const menuBar = document.querySelector('.menu__options');
const textBtn = document.querySelector('.option-text');
const textContainer = document.querySelector('.board__text');
let selectedTextBox = null;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let active = null;

imageFile.addEventListener('change', () => {
    console.log("hello1");
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

textBtn.addEventListener('click', () => {
    const textBox = document.createElement('textarea');
    textBox.setAttribute('class', 'text-box');

    textBox.style.position = 'absolute';
    textBox.style.left = '0';

    textContainer.append(textBox);

    active = 'text';
})

textContainer.addEventListener('mousedown', (event) => {
    selectedTextBox = event.target;
    console.log("down", selectedTextBox);
})
textContainer.addEventListener('mouseup', (event) => {
    selectedTextBox = null;
    console.log("up");
})

canvas.addEventListener('mousedown', () => {
    console.log('canvas down');
});
canvas.addEventListener('mousemove', (event) => {
    let coordinateX = event.layerX;
    let coordinateY = event.layerY;

    switch (active) {
        case 'draw': ;
        case 'erase': ;
        case 'text': {
            if (selectedTextBox) {
                selectedTextBox.style.transform = `translate(${coordinateX}px,${coordinateY}px)`;
            }
        };
        case 'background': ;
        default: ;
    }
});
canvas.addEventListener('mouseup', () => {
    console.log('canvas up');
});