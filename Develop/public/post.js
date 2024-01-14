// Function to handle the post creation form submission
const createPostHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Collect user input from form fields
    const title = document.querySelector('#postTitle').value.trim();
    const content = document.querySelector('#postContent').value.trim();

    // Check if all required fields are filled
    if (title && content) {
        try {
            // Make a POST request to the server with post data
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' },
            });

            // Check if the request was successful (status code 200-299)
            if (response.ok) {
                // Optionally, can redirect to the updated post or
                // reload the page based on your application's requirements
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

// Function to handle the post update form submission
const updatePostHandler = async (event) => {
    // ... similar to createPostHandler, but make a PUT request ...

    // Example:
    // const postId = document.querySelector('#postId').value.trim();
    // const response = await fetch(`/api/posts/${postId}`, {
    //     method: 'PUT',
    //     body: JSON.stringify({ title, content }),
    //     headers: { 'Content-Type': 'application/json' },
    // });

    // ... handle response ...
};

// Function to handle the post deletion
const deletePostHandler = async (postId) => {
    try {
        // Make a DELETE request to the server
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });

        // Check if the request was successful (status code 200-299)
        if (response.ok) {
            // Optionally, you can redirect or reload the page based on your application's requirements
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
};

// Add event listeners to the respective forms or buttons
document
    .querySelector('.create-post-form')
    .addEventListener('submit', createPostHandler);

document
    .querySelector('.update-post-form')
    .addEventListener('submit', updatePostHandler);
