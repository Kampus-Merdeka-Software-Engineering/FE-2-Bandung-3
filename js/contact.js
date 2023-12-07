function contact() {
  const form = document.getElementById("contact-us")

  form.addEventListener("submit", async function (event){
    event.preventDefault();
    const formContact = new FormData(form);
    const formprops = Object.fromEntries(formContact);

    try {
      const response = await fetch("https://be-2-bandung-3-production.up.railway.app/contact",{
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formprops),
      });
      const data = await response.json();
      console.log("success:", data);
      alert("Saran anda telah kami terima. Terima Kasih.")
    } catch (error) {
      console.error("error:",error);
      alert("Gagal mengirim pesan")
    }

  })
}
contact();