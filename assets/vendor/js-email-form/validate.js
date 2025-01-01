document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Show loading message and reset error/success messages
    const loading = document.getElementById("loading");
    const errorMessage = document.getElementById("error-message");
    const sentMessage = document.getElementById("sent-message");

    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    // Collect form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      // Send POST request to backend
      const response = await fetch(
        "https://portfolio-backend-f4f9.onrender.com/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // Check for response status
      const responseData = await response.json(); // Assuming backend sends JSON response
      if (response.ok) {
        // Success: Display success message and reset form
        loading.style.display = "none";
        sentMessage.style.display = "block";
        sentMessage.textContent =
          responseData.message || "Message sent successfully!";
        this.reset();
      } else if (response.status === 400) {
        // Client error: Validation issue
        throw new Error(
          responseData.error || "Validation error. Please check your inputs."
        );
      } else if (response.status === 500) {
        // Server error: Backend issue
        throw new Error(
          responseData.error || "Server error. Please try again later."
        );
      } else {
        // Other errors
        throw new Error(
          responseData.error || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      // Handle errors
      loading.style.display = "none";
      errorMessage.style.display = "block";
      errorMessage.textContent = error.message;
    }
  });
