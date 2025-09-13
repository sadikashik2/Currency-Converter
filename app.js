const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";//usd.min.json";

const dropdownSelect = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');
const icon = document.querySelector('.dropdown i');


for (let select of dropdownSelect) {
    for (let currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "BDT") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener('change', (event) => {
        let element = event.target;//get the html select element
        updateFlag(element);
    })
};

const updateFlag = (element) => {
    let currCode = element.value; //BDT--key
    let countryCode = countryList[currCode]; //BD--value
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;

};

const updateExchangeRate = async () => {
    let amount = document.querySelector('.amount input'); //get the html element
    let amountValue = amount.value;
    if (amountValue === "" || amountValue <= 0) {
        amountValue = 1;
        amount.value = "1";
    }
    let fromCurrVal = fromCurr.value.toLowerCase();
    let toCurrVal = toCurr.value.toLowerCase();
    const URL = `${baseURL}/${fromCurrVal}.min.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurrVal][toCurrVal];
    let finalAmount = (amountValue * rate).toFixed(2);
    msg.innerText = `${amountValue} ${fromCurrVal.toUpperCase()} = ${finalAmount} ${toCurrVal.toUpperCase()}`;
};


icon.addEventListener('click', () => {
    let a = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = a;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
})


btn.addEventListener('click', (event) => {
    event.preventDefault();
    updateExchangeRate();

});

window.addEventListener('load', () => {
    updateExchangeRate();
});
