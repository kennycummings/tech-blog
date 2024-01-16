// Sign up form

// Function to handle the sign-up form submission
const signupFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Collect user input from form fields
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    // Check if all required fields are filled
    if (name && email && password) {
        try {
            // Make a POST request to the server with user data
            const response = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Check if the request was successful (status code 200-299)
            if (response.ok) {
                // Redirect to the dashboard page after successful sign-up
                document.location.replace('/dashboard');
            } else {
                // Display an alert with the error message if the request fails
                alert(`Error: ${response.statusText}`);
            }
        } catch (error) {
            // Handle any unexpected errors during the fetch operation
            console.error('Error during fetch:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    } else {
        // Display an alert if any required field is empty
        alert('Please fill in all required fields.');
    }
};

// Add an event listener to the sign-up form
document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
