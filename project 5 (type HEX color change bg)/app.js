
  //=========projects requirements

  //---------------change the background color by the random hex color by clicking a button
  //--------------- Also display the hex code from disabled input field
  //--------------- Create a button and copy the hex code
  //--------------    Create copy tost message
  //---------------   user can type your own hex code
 
 
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
   const copyBtn = document.getElementById("copy-btn");

   changeBtn.addEventListener("click", function(){
       const bgColor = generateHEXcolor();
       root.style.backgroundColor = bgColor;
       input.value = bgColor;
   });

   copyBtn.addEventListener("click", function(){
       navigator.clipboard.writeText(input.value);
       if(div != null){
         div.remove();
         div = null;
       }
      if(isValidHex(input.value)){
        generateToastMsg(`${input.value} copied`)
      }else{
         alert( "Invalid color code");
      }
   });


   input.addEventListener("keyup", function(e){
    const color = e.target.value;

    if(color && isValidHex(color)){
       root.style.backgroundColor = color;
    }
  })
}
//step 2 -random color generator function
function generateHEXcolor(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
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
    if(color.length != 7) return false;
    if(color[0] !="#") return false;

    color = color.substring(1);
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