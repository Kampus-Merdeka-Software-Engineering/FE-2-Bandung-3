// method post
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
      const data = await response.json()
      
      Swal.fire("Thank you for reaching out! Your message has been successfully sent. We'll get back to you shortly. Safe travels with Travlio!");
      this.reset();
    } catch (error) {
      
      Swal.fire({
        icon: "error",
        text: "Oops! It seems there was an issue submitting your message. Please double-check your information and try again. If the problem persists, feel free to reach out to our support team.",
        
      });
    }

  })
}
contact();