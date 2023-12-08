// method get
const tbody = document.querySelector('tbody');
let dataBooking = [];

const loadData = async () => {
  try {
    const url = await fetch("https://be-2-bandung-3-production.up.railway.app/booking");
    dataBooking = await url.json();
    console.log(dataBooking);
    loadDataBooking(dataBooking);
  } catch (error) {
    console.log(error)
  }
}

const loadDataBooking = (data) => {
  const output = data.map((booking) => {
    return `
    <tr>
          <td data-label="Nama">${booking.name}</td>
          <td data-label="E-Mail">${booking.email}</td>
          <td data-label="Phone">${booking.phone}</td>
          <td data-label="Date">${booking.date_destination}</td>
          <td data-label="From">${booking.from}</td>
          <td data-label="To">${booking.to}</td>
          <td data-label="Adults">${booking.adult}</td>
          <td data-label="Children">${booking.children}</td>
          <td data-label="Airlines">${booking.airline}</td>
    </tr>
    `
  }).join('')
  tbody.innerHTML = output;
}

loadData();

// method post
const API_BASE_URL = 'https://be-2-bandung-3-production.up.railway.app';

function Booking() {
  const form = document.getElementById("booking-form")
  console.log(form, "ini form")

  form.addEventListener("submit", async function (event){
    event.preventDefault();
    const formData = new FormData(form);
    const formprops = Object.fromEntries(formData);
    console.log(formprops, "ini form props");
    try {
      const response = await fetch(`${API_BASE_URL}/booking`,{
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formprops),
      });
      const select1 = document.getElementById('from');
      const select2 = document.getElementById('to');

    if (select1.value === select2.value) {
      alert('Select destination cannot be the same');
      
    } else {
      console.log("sukses")
    }
      const data = await response.json();
      console.log("success:", data);
      alert("Ticket booking successful")
    
    } catch (error) {
      console.error("error:",error);
      alert("There was an error ordering tickets, please try again")
    }

  })
}
Booking();

function validateSelection() {
  try {
    var select1 = document.getElementById('select1');
    var select2 = document.getElementById('select2');

    if (select1.value === select2.value) {
      throw new Error('Select values cannot be the same');
    } else {
      console.log('Validation passed');
    }
  } catch (error) {
    alert(error.message);
  }
  }
