window.onload = function(){
    main();
}
const converter = {
    area: {
        name: "Area",
        units: {
            squareKm: "Square Kilometer",
            squareM: "Square Meter",
            squareMile: "Square Mile",
            squareYard: "Square Yard",
            squareInch: "Square Inch",
            squareFoot: "Square Foot",
            hectare: "Hectare",
            acre: "Acre"
        }
    },
    mass: {
        name: "Mass",
        units: {
            tone: "Tone",
            kilogram: "Kilogram",
            microGram: "Microgram",
            gram: "Gram",
            milligram: "Milligram",
            stone: "Stone",
            pound: "Pound",
            ounce: "Ounce",
            usTOn: "Us Ton"
        }
    },
    length: {
        name: "Length",
        units: {
            kilometer: "kilometer",
            centimeter: "Centimeter",
            millimeter: "Millimeter",
            foot: "Foot",
            inch: "Inch",
            mile: "Mile",
            nanoMeter: "Nanometer"
        }
    },
    volume: {
        name: "Volume",
        units: {
            liquidGallon: "US liquid gallon",
            liquidQuart: "US liquid quart",
            liquidPint: "US liquid pint",
            fluidOnce: "fluid ounce",
            liter: "Liter",
            milliLiter: "Milliliter"
        }
    },
    time: {
        name: "Time",
        units: {
            day: "Day",
            week: "Week",
            month: "Month",
            calenderYear: "Calender Year",
            hour: "Hour",
            minute: "Minute",
            second: "Second",
            nanosecond: "Nanosecond",
            millisecond:"Millisecond",
            microsecond: "Microsecond"
        }
    }
   

}
function main(){
    const categorySelect = document.getElementById("category-select");
    const leftSelect = document.getElementById("left-select")
    const rightSelect = document.getElementById("right-select")

    categorySelect.addEventListener("change", function(){ 

    const converterName = categorySelect.value;
    const units  = converter[converterName].units;
    // left select handler 
    removeChild(leftSelect);   
    const leftSelectKey = Object.keys(units);
    leftSelectKey.forEach((item) => {
        addOption(leftSelect,{value: item, text:units[item]})
    })
    


    // right select handler 
    removeChild(rightSelect);
    const rightSelectKey = Object.keys(units);
    rightSelectKey.forEach((item) => {
        addOption(rightSelect,{value: item, text:units[item]})
    })

    rightSelect.getElementsByTagName("option")[2].selected = 'selected';
        
    })

    removeChild(categorySelect);
    const converterKeys = Object.keys(converter).sort();
    converterKeys.forEach((item) => {
      addOption(categorySelect, {value: item, text: converter[item].name});
    })

    const converterName = categorySelect.value;
    const units  = converter[converterName].units;
    // left select handler 
    removeChild(leftSelect);   
    const leftSelectKey = Object.keys(units);
    leftSelectKey.forEach((item) => {
        addOption(leftSelect,{value: item, text:units[item]})
    })
    


    // right select handler 
    removeChild(rightSelect);
    const rightSelectKey = Object.keys(units);
    rightSelectKey.forEach((item) => {
        addOption(rightSelect,{value: item, text:units[item]})
    })

    rightSelect.getElementsByTagName("option")[2].selected = 'selected';
}

function addOption (parent, option){
    const opt = document.createElement('option');
    opt.setAttribute("value", option.value);
    opt.innerText = option.text;

    parent.appendChild(opt)
}


function removeChild(parent) {
    while(parent.firstChild){
       parent.firstChild.remove()
    }
   }