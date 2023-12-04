// script start booking page
//date
let currentDateTime = new Date();
let year = currentDateTime.getFullYear();
let month = (currentDateTime.getMonth() + 1);
let date = (currentDateTime.getDate() + 1);

if (date < 10) {
    date = '0' + date;
}
if (month < 10) {
    month = '0' + month;
}

let dateTomorrow = year + "-" + month + "-" + date;
let checkinElem = document.querySelector("#date");

checkinElem.setAttribute("min", dateTomorrow);

//from
const wrapper = document.querySelector(".wrapper");
const selectBtn = wrapper.querySelector(".select-btn");
const searchInp = wrapper.querySelector("input");
const options = wrapper.querySelector(".options");

let destination = ["Banda Aceh", "Batam", "Bengkulu", "Jambi", "Medan", "Padang", "Palembang",
    "Pangkal Pinang", "Pekanbaru", "Bandar Lampung", "Tanjung Pinang", "Bandung", "Bangka Belitung", "Malang", "Semarang",
    "Yogyakarta", "Solo", "Surabaya", "Denpasar", "Lombok", "Labuan Bajo", "Kupang", "Pontianak",
    "Banjarmasin", "Balikpapan", "Ambon", "Mataram", "Kendari", "Gorontalo", "Makassar", "Manado",
    "Palu", "Ternate", "Samarinda", "Biak", "Jayapura", "Marauke", "Timika", "Sorong"];

function addDestination(selectedDestination) {
    options.innerHTML = "";
    destination.forEach(destinasi => {
        let isSelected = destinasi == selectedDestination ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}">${destinasi}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
addDestination();

function updateName(selectedLi) {
    searchInp.value = "";
    addDestination(selectedLi.innerText);
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

searchInp.addEventListener("keyup", () => {
    let arr = [];
    let searchWord = searchInp.value.toLowerCase();
    arr = destination.filter(data => {
        return data.toLowerCase().startsWith(searchWord);
    }).map(data => {
        let isSelected = data == selectBtn.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName(this)" class="${isSelected}">${data}</li>`;
    }).join("");
    options.innerHTML = arr ? arr : `<p style="margin-top: 10px;">Oops! Your destination not found</p>`;
});

selectBtn.addEventListener("click", () => wrapper.classList.toggle("active"));

//to
const wrapper_to = document.querySelector("#wrapper");
const selectBtn_to = wrapper_to.querySelector("#select-btn");
const searchInp_to = wrapper_to.querySelector(".input");
const options_to = wrapper_to.querySelector("#options");

let destination_to = ["Banda Aceh", "Batam", "Bengkulu", "Jambi", "Medan", "Padang", "Palembang",
    "Pangkal Pinang", "Pekanbaru", "Bandar Lampung", "Tanjung Pinang", "Bandung", "Bangka Belitung", "Malang", "Semarang",
    "Yogyakarta", "Solo", "Surabaya", "Denpasar", "Lombok", "Labuan Bajo", "Kupang", "Pontianak",
    "Banjarmasin", "Balikpapan", "Ambon", "Mataram", "Kendari", "Gorontalo", "Makassar", "Manado",
    "Palu", "Ternate", "Samarinda", "Biak", "Jayapura", "Marauke", "Timika", "Sorong"];

function addDestination_to(selectedDestination_to) {
    options_to.innerHTML = "";
    destination_to.forEach(dest_to => {
        let isSelected_to = dest_to == selectedDestination_to ? "selected_to" : "";
        let li = `<li onclick="updateName_to(this)" class="${isSelected_to}" on>${dest_to}</li>`;
        options_to.insertAdjacentHTML("beforeend", li);
    });
}
addDestination_to();

function updateName_to(selectedLi_to) {
    searchInp_to.value = "";
    addDestination_to(selectedLi_to.innerText);
    wrapper_to.classList.remove("active");
    selectBtn_to.firstElementChild.innerText = selectedLi_to.innerText;
}

searchInp_to.addEventListener("keyup", () => {
    let arr_to = [];
    let searchWord_to = searchInp_to.value.toLowerCase();
    arr_to = destination_to.filter(data_to => {
        return data_to.toLowerCase().startsWith(searchWord_to);
    }).map(data_to => {
        let isSelected_to = data_to == selectBtn_to.firstElementChild.innerText ? "selected" : "";
        return `<li onclick="updateName_to(this)" class="${isSelected_to}">${data_to}</li>`;
    }).join("");
    options_to.innerHTML = arr_to ? arr_to : `<p style="margin-top: 10px;">Oops! Your Destination not found</p>`;
});

selectBtn_to.addEventListener("click", () => wrapper_to.classList.toggle("active"));
// validasi untuk from dan to
function validasi_destinasi(){  
    if (options !== options_to) {
        alert("please choose another destination")
    }

}
// script end booking page

// smooth scrool pada index.html 
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    let elm = document.getElementById(eID);
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


function smoothScroll(eID) {
    let startY = currentYPosition();
    let stopY = elmYPosition(eID);
    let distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    let speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    let step = Math.round(distance / 25);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if (stopY > startY) {
        for ( let i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( let i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
  return false;
}
// end scrool

// script untuk menyambungkan API
