// script untuk menyambungkan API
const API_BASE_URL = 'https://be-2-bandung-3-production.up.railway.app/';

// Mendapatkan referensi ke elemen-elemen HTML
const bookingForm = document.getElementById('booking-form');
const riwayatTabel = document.querySelector('tbody');

// Menghubungkan fungsi submitForm dengan penyerahan formulir
bookingForm.addEventListener('submit', formButton);

// Mengambil data reservasi saat halaman dimuat
window.addEventListener('DOMContentLoaded', fetchData);
// Mengecek apakah browser mendukung notifikasi
if ('Notification' in window) {
    Notification.requestPermission();
}
// Fungsi untuk menampilkan notifikasi
function BookingNotification(title, message) {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        const notification = new Notification(title, {
          body: message,
        });
        notification.onclick = function () {
        };
      } else {
        // Notifikasi ditolak
        alert(message);
      }
    });
  } else {
    // Browser tidak mendukung notifikasi, tampilkan pesan alternatif
    alert(message);
  }
}

async function formButton(event) {
  event.preventDefault();

  const formData = new FormData(bookingForm);

  const bookingData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    from: formData.get('from'),
    to: formData.get('to'),
    adults: formData.get('adults'),
    children: formData.get('children'),
    bookingdate: new Date(formData.get('date')).toISOString(),
    airlines: formData.get('airlines')
  };

  // Memeriksa apakah kombinasi service,tanggal, dan waktu sudah ada dalam reservasi yang ada
  const isDuplicateBooking = await isBookingDuplicate(bookingData);
  if (isDuplicateBooking) {
    alert('Reservasi dengan kombinasi yang sama sudah ada. Silakan pilih kombinasi yang lain.');
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    if (response.ok) {
      const createdBooking = await response.json();
      displayBooking(createdBooking);
      // Tampilkan notifikasi berhasil
      BookingNotification('Booking berhasil!', 'Terima kasih telah memesan pada web kami.');
    } else {
      console.error('Gagal melakukan booking');
      // Tampilkan notifikasi gagal
      BookingNotification('Gagal melakukan booking', 'Mohon coba lagi nanti.');
    }
  } catch (error) {
    console.error(error);
    // Tampilkan notifikasi gagal
    BookingNotification('Gagal melakukan booking', 'Terjadi kesalahan. Mohon coba lagi nanti.');
  }
}

// Mendefinisikan fungsi untuk menampilkan data reservasi ke dalam tabel
function displayBooking(booking) {
  const row = document.createElement('tr');

  // Memeriksa apakah properti bookingdate ada dalam objek booking
  if (booking.bookingdate) {
    // Mengambil tanggal dari booking.bookingdate (format: yyyy-mm-dd)
    const bookingDate = booking.bookingdate.substring(0, 10); // Ambil tanggalnya saja
    const dateParts = bookingDate.split('-');
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Format ulang menjadi dd-mm-yyyy

    row.innerHTML = `
      <td data-label="Nama">${booking.name}</td>
      <td data-label="E-Mail">${booking.email}</td>
      <td data-label="Phone">${booking.phone}</td>
      <td data-label="Date">${formattedDate}</td>
      <td data-label="From">${booking.from}</td>
      <td data-label="To">${booking.to}</td>
      <td data-label="Adults">${booking.adults}</td>
      <td data-label="Children">${booking.children}</td>
      <td data-label="Airlines">${booking.airlines}</td>
    `;
  }

  riwayatTabel.appendChild(row);
}

async function fetchData() {
    try {
      const response = await fetch(`${API_BASE_URL}/booking`);
      if (response.ok) {
        const bookings = await response.json();
        bookings.forEach((booking) => {
          displayBooking(booking);
          
        });
      } else {
        console.error('Gagal mengambil data reservasi');
      }
    } catch (error) {
      console.error(error);
    }
}