// Toggle mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('toggle');
});

// Optional navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

 // Back to top button
  const topBtn = document.getElementById("topBtn");
  window.onscroll = () => { topBtn.style.display = pageYOffset > 300 ? "block" : "none"; };
  topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: 'smooth' }));

 const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  status.textContent = "Sending...";

  try {
    const res = await fetch("/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (data.success) {
      status.textContent = "✅ Message sent successfully!";
      form.reset();
    } else {
      status.textContent = "❌ Failed to send message.";
    }
  } catch (err) {
    status.textContent = "⚠️ Error sending message. Check server logs.";
  }
});

