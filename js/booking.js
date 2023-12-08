// method get
const tbody = document.querySelector('tbody');
let dataBooking = [];

const loadData = async () => {
  try {
    const url = await fetch("https://be-2-bandung-3-production.up.railway.app/booking");
    dataBooking = await url.json(); 
    loadDataBooking(dataBooking);
  } catch (error) {
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

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const formprops = Object.fromEntries(formData);
    const select1 = document.getElementById('from');
    const select2 = document.getElementById('to');

    if (select1.value === select2.value) {
      Swal.fire("Select destination cannot be the same!");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formprops),
      });
      const data = await response.json();

      Swal.fire({
        title: "Success",
        text: "Ticket booking successful",
        icon: "success"
      });
      loadData();
      this.reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error ordering tickets, please try again!",
        
      });
    }

  })
}
Booking();

