window.onload = function(){
    main();
}
const converter = {
    area: {
        name: "Area",
    },
    length: {
        name: "Length",
    },
    mass: {
        name: 'Mass',
    },
    temperature: {
        name: "Temperature",
    },
    time: {
        name: "Time",
    },
    volume: {
        name: "Volume",
    },
    dataTransferRate: {
        name: "Data Transfer Rate",
    }

};

function main(){
    const categorySelect = document.getElementById('category-select');
     removeChild(categorySelect);
    const converterKeys = Object.keys(converter).sort();
    converterKeys.forEach((item) => {
        addOption(categorySelect, {value: item, text: converter[item].name});
     })
     


  function addOption(parent, option){
    const opt = document.createElement("option");
    opt.setAttribute("value", option.value);
    opt.innerText = option.text;

    parent.appendChild(opt);
  }

  function removeChild(parent){
    while(parent.firstChild){
        parent.firstChild.remove();
    }
  }
}