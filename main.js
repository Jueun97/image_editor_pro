'use strict';

const imageFile = document.querySelector('.upload-image');
const imageBox = document.querySelector('.board__image');
const menuBar = document.querySelector('.menu__options');
const textBtn = document.querySelector('.option-text');
const textOptions = document.querySelector('.text-options');
const textContainer = document.querySelector('.board__text');
let selectedTextBox = null;
const backgroudBox = document.querySelector('.board__background');
const colorBtn = document.querySelector('.color__colors');
const sizeBtn = document.querySelector('.size');
const fontBtn = document.querySelector('.font__style');
const gradientContainer = document.querySelector('.option-colors');
const gradientAddBtn = document.querySelector('.option-add');
const gradientRemoveBtn = document.querySelector('.color-remove');
const gradientApplyBtn = document.querySelector('.option-apply');
const gradientDirectionBtn = document.querySelector('.gradient__direction');
const gradientRangeBar = document.querySelector('.opacity__range');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let grd = null;
let grdForText = context.createLinearGradient(0, 0, 350, 0);
let grdForDraw = context.createLinearGradient(0, 0,350, 550);
let grdForBackground = context.createLinearGradient(0, 0, 0, 550);

let active = null;
let curX, curY, prevX, prevY = null;
let drawing = false;
let textMoving = false;
let erasing = false;
let colorForText = 'black';
let colorForDraw = 'black';
let colorForBg = 'black';
let textSize = '';
let drawSize = '';
let eraserSize = '';
let isGradientForDraw = false;
let isGradientForBg = false;
let gradientDirection = 'to right';
let opacityRange = '';

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
        textOptions.style.display = 'inline-block';
    } else if (active === 'add') {
        const textBox = document.createElement('textarea');
        textBox.setAttribute('class', 'text-box');

        textBox.style.position = 'absolute';
        textBox.style.left = '0';

        textContainer.append(textBox);
        active = 'text';
    } else if (active === 'remove') {
        selectedTextBox.remove();
    } else {
        textOptions.style.display = 'none';
    }

    if (active === 'save')
        saveCanvas();

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
                context.globalCompositeOperation = 'source-over';
                prevX = curX;
                prevY = curY;
                curX = coordinateX;
                curY = coordinateY;
                context.lineWidth = drawSize;
                if (isGradientForDraw)
                    context.strokeStyle = grdForDraw;
                else
                    context.strokeStyle = colorForDraw;
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
    const color = event.target.getAttribute('data-color');

    if (active === 'draw')
        isGradientForDraw = false;
    else if (active === 'background')
        isGradientForBg = false;
    if (color) {
        switch (active) {
            case 'draw': 
                colorForDraw = color;
                break;
            case 'text': {
                if (selectedTextBox) {
                    colorForText = color;
                    selectedTextBox.style.color = colorForText;
                }
                break;
            };
            case 'background': {
                colorForBg = color;
                backgroudBox.style.background = 'none';
                backgroudBox.style.backgroundColor = colorForBg+opacityRange;
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

gradientAddBtn.addEventListener('click', () => {
    const listCount = gradientContainer.childElementCount;
    
    if (listCount < 3) {
        const list = document.createElement('li');
        list.setAttribute('class', 'colors-color');
        list.innerHTML = `
        <input type="color" class="color-value">
        <i class="far fa-times-circle color-remove"></i>
        `
        gradientContainer.appendChild(list);

        if (listCount === 2) {
            gradientAddBtn.style.display = 'none';
        }
    }
});

gradientContainer.addEventListener('click', (event) => {
    const removeBtn = event.target.matches('.color-remove');
    const target = event.target.parentNode;
    let listCount = gradientContainer.childElementCount;
    
    if (removeBtn && listCount > 2) {
        target.remove();

        if (--listCount < 3)
            gradientAddBtn.style.display = 'block';
    }
});

gradientApplyBtn.addEventListener('click', (event) => {
    const gradientValue = document.querySelectorAll('.color-value');
    const gradientCount = gradientValue.length;
    const opacity = '99';

    if (active === 'draw')
        isGradientForDraw = true;
    else if (active === 'background')
        isGradientForBg = true;

    switch (gradientCount) {
        case 2: {
            if (active === 'text') {
                grdForText.addColorStop(0, gradientValue[0].value);
                grdForText.addColorStop(1, gradientValue[1].value);
                selectedTextBox.style.background = `linear-gradient(${gradientDirection}, ${gradientValue[0].value}, ${gradientValue[1].value})`;
                selectedTextBox.style.webkitBackgroundClip = 'text';
                selectedTextBox.style.webkitTextFillColor = 'transparent';
                console.log(selectedTextBox);
            }
            else if (active === 'draw') {
                grdForDraw.addColorStop(0, gradientValue[0].value);
                grdForDraw.addColorStop(1, gradientValue[1].value);
            }
            else if (active === 'background') {
                grdForBackground.addColorStop(0, gradientValue[0].value+opacityRange);
                grdForBackground.addColorStop(1, gradientValue[1].value+opacityRange);
                backgroudBox.style.background = `linear-gradient(${gradientDirection}, ${gradientValue[0].value}, ${gradientValue[1].value})`;
                console.log(grdForDraw);
            }
            
            break;
        }
        case 3: {
            if (active === 'text') {
                grdForText.addColorStop(0, gradientValue[0].value);
                grdForText.addColorStop(0.5, gradientValue[1].value);
                grdForText.addColorStop(1, gradientValue[2].value);
                selectedTextBox.style.background = `linear-gradient(${gradientDirection}, ${gradientValue[0].value}, ${gradientValue[1].value},  ${gradientValue[2].value})`;
                selectedTextBox.style.webkitBackgroundClip = 'text';
                selectedTextBox.style.webkitTextFillColor = 'transparent';
            }
            else if (active === 'draw') {
                grdForDraw.addColorStop(0, gradientValue[0].value);
                grdForDraw.addColorStop(0.5, gradientValue[1].value);
                grdForDraw.addColorStop(1, gradientValue[2].value);
            }
            else if (active === 'background') {
                grdForBackground.addColorStop(0, gradientValue[0].value+opacityRange);
                grdForBackground.addColorStop(0.5, gradientValue[1].value+opacityRange);
                grdForBackground.addColorStop(1, gradientValue[2].value+opacityRange);
                backgroudBox.style.background = `linear-gradient(${gradientDirection}, ${gradientValue[0].value}, ${gradientValue[1].value},${gradientValue[2].value})`;
                console.log(grdForDraw);
            }
            break;
        }
    }
   

    //
})

gradientDirectionBtn.addEventListener('click', (event) => {
    const target = event.target.getAttribute('data-direction');
    
    switch (target) {
        case 'right':
            gradientDirection = 'to right';
            grd = context.createLinearGradient(0, 0, 350, 0);
            break;
        case 'down':
            gradientDirection = '180deg';
            grd = context.createLinearGradient(0, 0, 0, 550);
            break;
        case 'left':
            gradientDirection = 'to left';
            grd = context.createLinearGradient(350, 0, 0, 0);
            break;
        case 'up':
            gradientDirection = '0deg';
            grd = context.createLinearGradient(0, 550, 0, 0);
            break;
        default:
            gradientDirection = '180deg';
    }

    if (active === 'text') {
        grd = grdForText;
    } else if (active === 'draw') {
        grdForDraw = grd;
    } else if (active === 'background') {
        grdForBackground = grd;
    }
    
    console.log(grd);
})

gradientRangeBar.addEventListener('input', (event) => {
    const opacity = event.target.value;
    opacityRange = opacity * 100 + 5;
    switch (active) {
        case 'draw':
            break;
        case 'text':
            selectedTextBox.style.opacity = opacity;
            break;
        case 'background':
            backgroudBox.style.opacity = opacity;
            break;
        default:
            break;
            
    }
}) 

function saveCanvas() {
    //1. text 저장
    //1.1 text color - color, gradient
    //1.2 text style
    //1.3 text size
    //1.4 text position

    //2. 배경 저장
    //2.1 background color - color, gradient
    if (isGradientForBg) {
        context.fillStyle = grdForBackground;
    } else {
        context.fillStyle = colorForBg; 
    }
    context.fillRect(0, 0, 350, 550);

    //3. 파일로 저장
    context.globalCompositeOperation = 'destination-over';
    context.drawImage(imageBox, 0, 0, 350, 550);
    let dataUrl = canvas.toDataURL();
    document.querySelector('.preview').src = dataUrl;
}