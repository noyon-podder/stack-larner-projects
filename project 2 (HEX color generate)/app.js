
  //=========projects requirements

  //---------------change the background color by the random hex color by clicking a button
  //--------------- Also display the hex code from disabled input field
 
 
//steps 
//step 1 -create onload handler
window.onload = () => {
    main();
}
function main (){
   const root = document.getElementById('root');
   const button = document.getElementById("change-btn");
   const input = document.getElementById("input-value");

   button.addEventListener("click", function(){
       const bgColor = generateHEXcolor();
       root.style.backgroundColor = bgColor;
       input.value = bgColor;
   })
}
//step 2 -random color generator function
function generateHEXcolor(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
}
//step 3 -collect all necessary reference
//step 4 - handel the click event


