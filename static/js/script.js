// function validateInput(fieldId, errorId) {
//   let input = document.getElementById(fieldId);
//   let errorMessage = document.getElementById(errorId);
//   errorMessage.innerHTML = '';  // Clear previous error messages

//   if (fieldId === 'username') {
//       // Username validation: not empty, minimum length of 3
//       if (input.value.trim().length < 3) {
//           errorMessage.innerHTML = 'Username must be at least 3 characters long.';
//           input.classList.add('is-invalid');
//       } else {
//           input.classList.remove('is-invalid');
//       }
//   } else if (fieldId === 'email') {
//       // Email validation: valid email format
//       let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (!emailPattern.test(input.value.trim())) {
//           errorMessage.innerHTML = 'Please enter a valid email address.';
//           input.classList.add('is-invalid');
//       } else {
//           input.classList.remove('is-invalid');
//       }
//   } else if (fieldId === 'file') {
//       // File validation: must select a file
//       if (input.files.length === 0) {
//           errorMessage.innerHTML = 'Please select a file.';
//           input.classList.add('is-invalid');
//       } else {
//           input.classList.remove('is-invalid');
//       }
//   } else if (fieldId === 'message') {
//       // Message validation: not empty, minimum length of 10
//       if (input.value.trim().length < 10) {
//           errorMessage.innerHTML = 'Message must be at least 10 characters long.';
//           input.classList.add('is-invalid');
//       } else {
//           input.classList.remove('is-invalid');
//       }
//   }
// }

// function validateForm() {
//   let isValid = true;

//   // Check each field individually
//   ['username', 'email', 'file', 'message'].forEach(fieldId => {
//       let errorId = 'error_' + fieldId;
//       validateInput(fieldId, errorId);

//       // If any field has an error message, prevent form submission
//       if (document.getElementById(errorId).innerHTML !== '') {
//           isValid = false;
//       }
//   });

//   return isValid;  // Return false if validation fails, preventing form submission
// }
document.querySelector('#form').addEventListener('submit', function (e) {
    if (!validateForm()) {
        e.preventDefault(); // Prevent form submission if validation fails
    }
});

// Main form validation function
function validateForm() {
    let success = true;

    // Validate Username
    const username = document.querySelector('#username');
    const usernameVal = username.value.trim();
    if (usernameVal === '') {
        success = false;
        setError(username, 'Username is required');
    } else if (!validateName(usernameVal)) {
        success = false;
        setError(username, 'Only letters and spaces are allowed');
    } else {
        setSuccess(username);
    }

    // Validate Email
    const email = document.querySelector('#email');
    const emailVal = email.value.trim();
    if (emailVal === '') {
        success = false;
        setError(email, 'Email is required');
    } else if (!validateEmail(emailVal)) {
        success = false;
        setError(email, 'Please enter a valid email');
    } else {
        setSuccess(email);
    }

    // Validate File
    const file = document.querySelector('#file');
    const fileVal = file.value.trim();
    if (fileVal === '') {
        success = false;
        setError(file, 'Please upload a file');
    } else {
        setSuccess(file);
    }

    // Validate Message
    const message = document.querySelector('#message');
    const messageVal = message.value.trim();
    if (messageVal === '') {
        success = false;
        setError(message, 'Message is required');
    } else {
        setSuccess(message);
    }

    return success;
}

// Input validation for each field on input change
function validateInput(inputId, errorId) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.getElementById(errorId);
    const inputVal = inputElement.value.trim();

    if (inputVal === '') {
        errorElement.textContent = `${inputId} is required`;
        inputElement.classList.add('is-invalid');
    } else {
        errorElement.textContent = '';
        inputElement.classList.remove('is-invalid');
    }
}

// Set error message
function setError(element, message) {
    const errorElement = element.parentElement.querySelector('.error');
    errorElement.textContent = message;
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
}

// Set success state (no error)
function setSuccess(element) {
    const errorElement = element.parentElement.querySelector('.error');
    errorElement.textContent = '';
    element.classList.add('is-valid');
    element.classList.remove('is-invalid');
}

// Email validation
function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
}

// Username validation (only letters and spaces)
function validateName(username) {
    const pattern = /^[A-Za-z\s]+$/;
    return pattern.test(username);
}

setTimeout(function(){
    location.reload();
}, 2000); 
