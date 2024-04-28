const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const throttle = require('lodash.throttle');

const saveFormState = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500); // Update storage at most every 500 milliseconds

form.addEventListener('input', saveFormState);

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  const formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  console.log('Submitted Data:', formData);

  localStorage.removeItem('feedback-form-state');
  form.reset(); // Clear form fields
}

form.addEventListener('submit', handleFormSubmit);

// Check for stored data and pre-fill on page load
const storedData = JSON.parse(localStorage.getItem('feedback-form-state'));

if (storedData) {
  emailInput.value = storedData.email;
  messageTextarea.value = storedData.message;
}