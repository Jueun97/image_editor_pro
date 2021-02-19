'use strict';

const imageFile = document.querySelector('.upload-image');
const imageBox = document.querySelector('.board__image');
const menuBar = document.querySelector('.menu__options');
const textBtn = document.querySelector('.option-text');
const textContainer = document.querySelector('.board__text');
let selectedTextBox = null;

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
    reader.readAsDataURL(imageFile.files[0])
})

textBtn.addEventListener('click', () => {
    const textBox = document.createElement('textarea');
    textBox.setAttribute('class', 'text-box');

    textBox.style.position = 'absolute';
    textBox.style.left = '0';

    textContainer.append(textBox);
})

textContainer.addEventListener('mousedown', (event) => {
    selectedTextBox = event.target;
    console.log("down");
})
textContainer.addEventListener('mouseup', (event) => {
    selectedTextBox = null;
    console.log("up");
})

