/**
 * Date: 28-05-2022
 * Time: 10:40 PM
 * Author: Noyon Podder
 * Description: Color picker app for huge dom ....[stack larner copy project]
 */

// global 

let toastContainer = null;
const defaultColor = {
  red: 221,
  green: 222,
  blue: 238
}

// onload handler 

window.onload = () => {
    main();
    updateColorCodeToDom(defaultColor)
}

// main or boot function , this function will take care of all DOM reference

function main (){
  //DOM reference
  const generateRandomColorBtn = document.getElementById('generate-random-color');
  const colorModeHexInp = document.getElementById('input-hex');
  const colorSliderRed = document.getElementById('color-slider-red');
  const colorSliderGreen = document.getElementById('color-slider-green');
  const colorSliderBlue = document.getElementById('color-slider-blue');
  const copyToClipBoardBtn = document.getElementById('copy-to-clipboard');

  
  
  
  
//event listener 
  generateRandomColorBtn.addEventListener("click", handleGenerateRandomColorBtn);

  colorModeHexInp.addEventListener("keyup", handleColorModeHexInp);

  colorSliderRed.addEventListener('change', handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
  colorSliderGreen.addEventListener('change', handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
  colorSliderBlue.addEventListener('change', handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));

  copyToClipBoardBtn.addEventListener('click', handlerCopyToClipboard)

}
//event handler

function handleGenerateRandomColorBtn(){
  const color =  generateColorDecimal ();
  updateColorCodeToDom(color);
}

function handleColorModeHexInp(e){
  const hexColor = e.target.value;

  if(hexColor) {
    this.value = hexColor.toUpperCase();

    if(isValidHex(hexColor)){
      const color = hexToDecimalColors(hexColor)
      updateColorCodeToDom(color)
   }
  }
}

function handlerCopyToClipboard() {
  const colorModeRadios = document.getElementsByName('color-mode');
  const mode = getCheckedValueFromRadios(colorModeRadios);
  if (mode===null) {
    throw new Error('Invalid radio input');
  }

  if(toastContainer != null){
           toastContainer.remove();
           toastContainer = null;
  }
  if(mode === 'hex'){
   const hexColor = document.getElementById('input-hex').value;
   if(hexColor && isValidHex){
    navigator.clipboard.writeText(`#${hexColor}`);
    generateToastMsg(`#${hexColor} copied`)
   }else{
     alert("Invalid Hex Code")
   }

  }else{
   const rgbColor = document.getElementById('input-rgb').value;
   if(rgbColor){
    navigator.clipboard.writeText(rgbColor);
    generateToastMsg(`${rgbColor} copied`)
   }else{
     alert("Invalid Rgb Color");
   }
  }

  
}

// color slider handler 
function handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue) {
  return function () {
    const color = {
      red: parseInt(colorSliderRed.value),
      green: parseInt(colorSliderGreen.value),
      blue: parseInt(colorSliderBlue.value),
    };
    updateColorCodeToDom(color);
  }
};

/**
 * generate Dynamic toast message create
 * @param {string} msg 
 */
function generateToastMsg (msg) {
  toastContainer = document.createElement('div');
 toastContainer.innerText = msg;
toastContainer.className = "toast-message toast-message-slide-in";

toastContainer.addEventListener("click", function (){
    toastContainer.classList.remove("toast-message-slide-in")
    toastContainer.classList.add("toast-message-slide-out")

    toastContainer.addEventListener("animationend", function(){
        toastContainer.remove();
        toastContainer = null;
    })
})
 document.body.appendChild(toastContainer);
}

/**
 * Find value check from a radio button 
 * @param {Array} nodes
 * @returns { string | null}
 */
function getCheckedValueFromRadios(nodes){
  let checkedValue = null;

  for(let i = 0; i < nodes.length; i++){
    if(nodes[i].checked){
      checkedValue = nodes[i].value;
      break;
    }
  }
  return checkedValue;
}
/**
 * update dom elements with calculated color values
 * @param {object} color : ;
 */
function updateColorCodeToDom(color) {
  const hexColor = generateHEXcolor(color);
  const rgbColor = generateRgbColor(color);


   document.getElementById('color-display').style.background = `#${hexColor}`;
   document.getElementById('input-hex').value = hexColor;
  document.getElementById('input-rgb').value = rgbColor;
   document.getElementById('color-slider-red').value = color.red;
   document.getElementById('color-slider-red-label').innerText = color.red;
   document.getElementById('color-slider-green').value = color.green;
   document.getElementById('color-slider-green-label').innerText = color.green;
   document.getElementById('color-slider-blue').value = color.blue;
   document.getElementById('color-slider-blue-label').innerText = color.blue;

}

//utils 

/**
 * generate and return an object of three color decimal value 
 * @returns {object}
 */
function generateColorDecimal (){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return{
        red,
        green,
        blue
    }
}



/**
 * take a color object of three decimal value  and return the hexadecimal color code 
 * @param {object} color
 * @returns {string}
 */

function generateHEXcolor({red, green, blue}){

    const getTwoCode = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
    }

    return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}




/**
 * take a color object of three decimal value  and return the RGB color code 
 * @param {object} color 
 * @returns {string}
 */
function generateRgbColor ({red, green, blue}) {
    return `rgb ( ${red}, ${green}, ${blue} )`;
}

/**
 * convert hex to Decimal number
 * @param {string} hex 
 * @returns {object} 
 */
function hexToDecimalColors (hex){
  
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt( hex.slice(2, 4), 16);
    const blue = parseInt( hex.slice(4), 16);

    return {
      red,
      green,
      blue
    }
}



/**
 * hex color code validity check 
 * @param {object} color 
 * @returns {boolean}
 */

function isValidHex (color) {
    if(color.length != 6) return false;

    return /^[0-9A-Fa-f]{6}$/i.test(color);
}

generateHEXcolor();