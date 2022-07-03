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

const presetColors = [
  '#f34444',
  '#b0f427',
  '#5df427',
  '#3F56E8',
  '#FE45B5',
  '#c4debc',
  '#4831B6',
  '#1BAD7D',
  '#3C73E4',
  '#99cabd',
  '#5afbf4',
  '#3F56E8',
  '#FE45B5',
  '#7BD60D',
  '#e0f373',
  '#1BAD7D',
  '#3C73E4',
  '#3c388d',
  '#3F56E8',
  '#FE45B5',
  '#ecec22',
  '#f373d4',
  '#22ec87',
  '#59B4D1'

]

let customColors= new Array(24);
const audio = new Audio('./audio/copy.mp3')
// onload handler 

window.onload = () => {
    main();
    updateColorCodeToDom(defaultColor);

    //display color box 
    displayColorBox(document.getElementById('preset-colors'), presetColors);

    // custom local storage color save
   const customColorsString =  localStorage.getItem('customColors');
   if(customColorsString)
   customColors = JSON.parse(customColorsString);
   displayColorBox(document.getElementById('custom-colors'), customColors);
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
  const presetColorParents = document.getElementById('preset-colors');              
  const customColorParents = document.getElementById('custom-colors');   
  const saveToCustomBtn = document.getElementById('save-to-custom');
  const bgFileInput = document.getElementById('file-input');
  const bgFileInputBtn = document.getElementById('bg-file-input-btn');
  const bgPreview = document.getElementById('background-preview');
  const bgFileDeleteBtn = document.getElementById('bg-file-delete-btn');
  const bgController = document.getElementById('bg-controller');


  
  
  
  
//event listener 
  generateRandomColorBtn.addEventListener("click", handleGenerateRandomColorBtn);
  colorModeHexInp.addEventListener("keyup", handleColorModeHexInp);
  colorSliderRed.addEventListener('change', handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
  colorSliderGreen.addEventListener('change', handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
  colorSliderBlue.addEventListener('change', handlerColorSlider(colorSliderRed, colorSliderGreen, colorSliderBlue));
  copyToClipBoardBtn.addEventListener('click', handlerCopyToClipboard)
  presetColorParents.addEventListener("click", handlePresetColorParents);
  saveToCustomBtn.addEventListener("click", handleCustomColorBtn(customColorParents, colorModeHexInp))
  customColorParents.addEventListener("click", handleCustomColorParents);
  bgFileInputBtn.addEventListener("click", function(){
    bgFileInput.click();
  });
  bgFileInput.addEventListener("change",handlerBgFileInput(bgPreview, bgFileDeleteBtn, bgController));
  bgFileDeleteBtn.addEventListener("click", handlerBgFileDeleteButton(bgPreview, bgFileDeleteBtn, bgFileInput, bgController));
  document.getElementById("bg-size").addEventListener("change", changeBackgroundPreference)
  document.getElementById("bg-repeat").addEventListener("change", changeBackgroundPreference)
  document.getElementById("bg-position").addEventListener("change", changeBackgroundPreference)
  document.getElementById("bg-attachment").addEventListener("change", changeBackgroundPreference)
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
    audio.volume = 0.2;
    audio.play();
    generateToastMsg(`#${hexColor} copied`)
   }else{
     alert("Invalid Hex Code")
   }

  }else{
   const rgbColor = document.getElementById('input-rgb').value;
   if(rgbColor){
    navigator.clipboard.writeText(rgbColor);
    audio.volume = 0.2;
    audio.play();
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

//handlePreset color parents and copy code and audio sound effect add
function handlePresetColorParents(e){
  const child = e.target
 if(child.className === 'color-box'){
  navigator.clipboard.writeText(child.getAttribute('data-color'))
  audio.volume = 0.2;
  audio.play();
 };
}

//handle custom color preset copy and audio sound add 
function handleCustomColorParents(e){
  const child = e.target;
 if(child.className ==='color-box'){
   navigator.clipboard.writeText(child.getAttribute('data-color'));
   audio.play();
   audio.volume = 0.3;
 }
}
//handle custom color btn 
function handleCustomColorBtn(customColorParent, inputHex){
   
  return function(){
    const color = `#${inputHex.value}`;
    if(customColors.includes(color)){
      alert("Already Saved");
      return
    }
    customColors.unshift(color);
    if(customColors.length > 24){
      customColors = customColors.slice(0, 24)
      localStorage.setItem('customColors', JSON.stringify(customColors));
    }
    removeChild(customColorParent)
    displayColorBox (customColorParent, customColors);
  }
}
//handler bg file input
function handlerBgFileInput(bgPreview, bgFileDeleteBtn, bgController){
 return function (e){
  const file = e.target.files[0];
  const imageUrl = URL.createObjectURL(file);
  bgPreview.style.background = `url(${imageUrl})`;
  document.body.style.background = `url(${imageUrl})`
  bgFileDeleteBtn.style.display = 'inline'
  bgController.style.display = 'block';
 }
}
// handler bg file delete button
function handlerBgFileDeleteButton(bgPreview, bgFileDeleteBtn, bgFileInput, bgController){
return function (){
  bgPreview.style.background ='none'
  bgPreview.style.backgroundColor ='#dddeee'
  document.body.style.background ='none'
  document.body.style.backgroundColor ='#dddeee'
  bgFileDeleteBtn.style.display = 'none'
  bgFileInput.value = null;
  bgController.style.display = 'none';
}
}
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

/**
 * crate a div element with class color-box and  
 * @param {string} color
 */
function generateColorBox (color){
  const div = document.createElement('div');
  div.className = 'color-box';
  div.style.backgroundColor = color;
  div.setAttribute('data-color', color);
  return div;
}
/**
 * this function crate a multi color of color box
 * @param {object} parent 
 * @param {Array} colors
 */
function displayColorBox (parent, colors){
colors.forEach((color) => {
 if(isValidHex(color.slice(1))){
  const colorBox = generateColorBox (color);
  parent.appendChild(colorBox);
 }
})
}

/**
 * remove custom colors child 
 * @param {object} parent 
 */
function removeChild(parent){
  let child = parent.lastElementChild;  
  while (child) { 
      parent.removeChild(child); 
      child = parent.lastElementChild; 
  } 
}

function changeBackgroundPreference (){
  document.body.style.backgroundSize = document.getElementById("bg-size").value;
  document.body.style.backgroundRepeat = document.getElementById("bg-repeat").value;
  document.body.style.backgroundPosition = document.getElementById("bg-position").value;
  document.body.style.backgroundAttachment = document.getElementById("bg-attachment").value;
  
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