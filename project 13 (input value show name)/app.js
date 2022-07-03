const restartBtn = document.getElementById('reset');
const submitBtn = document.getElementById("submit");
 
restartBtn.addEventListener("click", function (){
    const textPra = document.getElementById("text-pra");
    textPra.style.display = 'none';
})

submitBtn.addEventListener("click", function(){
    const textPra = document.getElementById("text-pra");
    const strongName = document.getElementById("strong-name");
    const input = document.getElementById("name-value");
    const inputValue = input.value;
    if(!inputValue){
        alert("Please give ma a name!!")
    }else{
        textPra.style.display = 'block';
        strongName.innerText = inputValue;
        input.value = ' ';
    }
  

})