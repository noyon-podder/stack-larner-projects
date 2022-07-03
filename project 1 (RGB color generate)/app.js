
  //=========projects requirements
  //---------------change the background color by the random rgb color by clicking a button
 
 
//steps 
//step 1 -create onload handler
window.onload = () => {
    main();
}
function main (){
   const root = document.getElementById('root');
   const button = document.getElementById("change-btn");

   button.addEventListener("click", function(){
       const bgColor = generateRGBcolor();
       root.style.backgroundColor = bgColor;
   })
}
//step 2 -random color generator function
function generateRGBcolor(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return `rgb(${red}, ${green}, ${blue})`
}
//step 3 -collect all necessary reference
//step 4 - handel the click event


