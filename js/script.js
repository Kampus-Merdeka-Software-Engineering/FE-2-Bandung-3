//date
var currentDateTime = new Date();
var year = currentDateTime.getFullYear();
var month = (currentDateTime.getMonth() + 1);
var date = (currentDateTime.getDate() + 1);

if(date < 10) {
  date = '0' + date;
}
if(month < 10) {
  month = '0' + month;
}

var dateTomorrow = year + "-" + month + "-" + date;
var checkinElem = document.querySelector("#date");

checkinElem.setAttribute("min", dateTomorrow);

//from
const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
options = wrapper.querySelector(".options");

let countries = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
                 "Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
                 "Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
                 "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
                 "Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
                 "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];

function addCountry(selectedCountry) {
    options.innerHTML = "";
    countries.forEach(country => {
        let isSelected = country == selectedCountry ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${country}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addCountry();

function updateName(selectedLi) {
    searchInp.value = "";
    addCountry(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = countries.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

//to
const wrapper1 = document.querySelector("#wrapper"),
selectBtn1 = wrapper1.querySelector("#select-btn"),
searchInp1 = wrapper1.querySelector(".input"),
options1 = wrapper1.querySelector("#options");

let countries1 = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan",
                 "Brazil", "Canada", "China", "Denmark", "Ethiopia", "Finland", "France", "Germany",
                 "Hungary", "Iceland", "India", "Indonesia", "Iran", "Italy", "Japan", "Malaysia",
                 "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan",
                 "Peru", "Russia", "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland",
                 "Thailand", "Turkey", "Uganda", "Ukraine", "United States", "United Kingdom", "Vietnam"];

function addCountry1(selectedCountry1) {
    options1.innerHTML = "";
    countries1.forEach(country1 => {
        let isSelected1 = country1 == selectedCountry1 ? "selected1" : "";
        let li = `<li onclick="updateName1(this)" class="${isSelected1}">${country1}</li>`;
        options1.insertAdjacentHTML("beforeend", li);
    });
}
addCountry1();

function updateName1(selectedLi1) {
    searchInp1.value = "";
    addCountry1(selectedLi1.innerText);
    wrapper1.classList.remove("active");
    selectBtn1.firstElementChild.innerText = selectedLi1.innerText;
}

searchInp1.addEventListener("keyup", () => {
    let arr1 = [];
    let searchWord1 = searchInp1.value.toLowerCase();
    arr1 = countries1.filter(data1 => {
        return data1.toLowerCase().startsWith(searchWord1);
    }).map(data1 => {
        let isSelected1 = data1 == selectBtn1.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName1(this)" class="${isSelected1}">${data1}</li>`;
    }).join("");
    options1.innerHTML = arr1 ? arr1 : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
});

selectBtn1.addEventListener("click", () => wrapper1.classList.toggle("active"));
