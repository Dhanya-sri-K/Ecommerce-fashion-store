// Script for navigation bar
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}
function validateEmail(inputId, confirmationId) {
    var emailInput = document.getElementById(inputId);
    var confirmationElement = document.getElementById(confirmationId);
    var email = emailInput.value;

    // Updated regular expression for email validation
    var regex = /^\S+@\S+\.\S+$/;
    if (email.match(regex)) {
        // Email is valid
        confirmationElement.style.display = 'block';
        emailInput.value = ''; // Clear the input field after successful submission
    } else {
        // Email is invalid
        alert('Enter a valid email address');
    }
}

function validateForm() {
    var name = document.getElementById('nameInput').value.trim();
    var email = document.getElementById('contactEmailInput').value.trim();
    var subject = document.getElementById('subjectInput').value.trim();
    var message = document.getElementById('messageTextarea').value.trim();

    var nameRegex = /^[A-Za-z]+$/; // Regular expression to match only alphabets

    // Updated regular expression for email validation
    var emailRegex = /^\S+@\S+\.\S+$/;

    if (name === '' || !name.match(nameRegex)) {
        alert('Enter a valid name.');
        return false; // Prevent form submission
    }

    if (email === '' || !email.match(emailRegex)) {
        alert('Enter a valid Email.');
        return false; // Prevent form submission
    }

    if (subject === '') {
        alert('Please fill out the Subject.');
        return false; // Prevent form submission
    }

    if (message === '') {
        alert('Please fill out the message box.');
        return false; // Prevent form submission
    }

    // Display confirmation message
    document.getElementById('confirmationMessage').style.display = 'block';
    return false; // Prevent form submission
}
