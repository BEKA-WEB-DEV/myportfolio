document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Show loading message
    const loading = document.getElementById("loading");
    const errorMessage = document.getElementById("error-message");
    const sentMessage = document.getElementById("sent-message");

    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      const response = await fetch("https://your-backend-domain.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        loading.style.display = "none";
        sentMessage.style.display = "block";
        this.reset();
      } else {
        throw new Error("Failed to send the message.");
      }
    } catch (error) {
      loading.style.display = "none";
      errorMessage.style.display = "block";
      errorMessage.textContent = error.message;
    }
  });
