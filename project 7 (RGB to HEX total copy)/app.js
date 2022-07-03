
  //=========projects requirements

  //---------------change the background color by the random hex color by clicking a button
  //--------------- Also display the hex code from disabled input field
  //--------------- Create a button and copy the hex code
  //--------------    Create copy tost message
  //---------------   user can type your own hex code
  // -------------- show rgb color too, but do not edit 
  // -------------- user can also copy the rgb color code
 
 
//steps 

// global variable 

let div = null;
//step 1 -create onload handler
window.onload = () => {
    main();
}
function main (){
   const root = document.getElementById('root');
   const changeBtn = document.getElementById("change-btn");
   const input = document.getElementById("input-value");
   const input2 = document.getElementById("input-value2");
   const copyBtn = document.getElementById("copy-btn");

   changeBtn.addEventListener("click", function(){
       const color =  generateColorDecimal ();
       const hex = generateHEXcolor(color);
       const rgb = generateRgbColor (color);
       root.style.backgroundColor = hex;
       input.value = hex.substring(1);
       input2.value = rgb;
   });

   copyBtn.addEventListener("click", function(){
       navigator.clipboard.writeText(`#${input.value}`);
       if(div != null){
         div.remove();
         div = null;
       }
      if(isValidHex(input.value)){
        generateToastMsg(`#${input.value} copied`)
      }else{
         alert( "Invalid color code");
      }
   });


   input.addEventListener("keyup", function(e){
    const color = e.target.value;

    if(color) {
      input.value = color.toUpperCase();

      if(color && isValidHex(color)){
        root.style.backgroundColor = `#${color}`;
     }
    }
  
  })
}
//step 2 -random color generator function

// function 1 (generate 3 random decimal number for red, green, blue)
// return a object

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
// function 2 (generate hex color)

function generateHEXcolor({red, green, blue}){



    const getTwoCode = (value) => {
    
        const hex = value.toString(16);
        return hex.length === 1 ? `0${hex}` : hex;
    }

    return `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`.toUpperCase();
}

// function 3 (create rgba color code)

function generateRgbColor ({red, green, blue}) {


    return `rgb ${red}, ${green}, ${blue}`
}

function generateToastMsg (msg) {
     div = document.createElement('div');
    div.innerText = msg;
   div.className = "toast-message toast-message-slide-in";


   div.addEventListener("click", function (){
       div.classList.remove("toast-message-slide-in")
       div.classList.add("toast-message-slide-out")

       div.addEventListener("animationend", function(){
           div.remove();
           div = null;
       })
   })
    document.body.appendChild(div);
}


// isValidHex function call 

function isValidHex (color) {
    if(color.length != 6) return false;

    return /^[0-9A-Fa-f]{6}$/i.test(color);
}
//step 3 -collect all necessary reference

//step 4 - handel the  change button click event

// step 5 - handel the copy button click event

// step 6 - activated toast message

//step 7 - crate a dynamic toast message

//step 8 - remove the dynamic toast message 

// step 9 - create isHExValid function

//step 10 - implement change handler or input filed

//step 11 - prevent copying hex code if it is valid