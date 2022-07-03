const randomBtn = document.getElementById('random-btn');
const quote = document.getElementById('quote');


randomBtn.addEventListener("click", function(){
    const index = parseInt(Math.random() * randomQuote.length);
   const quotes = randomQuote[index]
   quote.innerHTML = quotes;
})

