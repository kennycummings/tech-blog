// Function to handle the comment form submission
const commentFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Collect user input from form fields
    const postId = document.querySelector('#postId').value.trim();
    const text = document.querySelector('#commentText').value.trim();

    // Check if all required fields are filled
    if (postId && text) {
        try {
            // Make a POST request to the server with comment data
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ postId, text }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Check if the request was successful (status code 200-299)
            if (response.ok) {
                // Optionally, can reload the page or update the UI
                // based on your application's requirements
                document.location.reload();
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

// Add an event listener to the comment form
document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
