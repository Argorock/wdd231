const checkoutForm = document.getElementById('checkoutForm');
const errorMessagesDiv = document.getElementById('errorMessages');
const errorList = errorMessagesDiv.querySelector('ul');

/**
 * Validates a credit card number using Luhn's algorithm.
 * @param {string} cardNumber - The credit card number string to validate.
 * @returns {boolean} - True if the card number is valid according to Luhn's algorithm, false otherwise.
 */
function isValidLuhn(cardNumber) {
    let sum = 0;
    let isSecondDigit = false;

    // Remove any non-digit characters from the card number
    cardNumber = cardNumber.replace(/\D/g, '');

    // Check typical card number length (13-19 digits)
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        return false;
    }

    // Iterate through the digits from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        // Double every second digit from the right
        if (isSecondDigit) {
            digit *= 2;
            // If doubling results in a number greater than 9, subtract 9
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        // Toggle the flag for the next digit
        isSecondDigit = !isSecondDigit;
    }
    // The number is valid if the sum is a multiple of 10
    return (sum % 10 === 0);
}

// Event listener for form submission
checkoutForm.addEventListener('submit', function (event) {
    errorList.innerHTML = '';
    errorMessagesDiv.classList.add('hidden'); 
    let hasErrors = false;

    // Credit Card Validation
    const cardInput = document.getElementById('cardNumber');
    const cardValue = cardInput.value.trim();
    if (!isValidLuhn(cardValue)) {
        const li = document.createElement('li');
        li.textContent = 'Invalid credit card number.';
        errorList.appendChild(li);
        hasErrors = true;
    }

    // Expiration Date Validation
    const expMonth = parseInt(document.getElementById('expMonth').value);
    const expYear = parseInt(document.getElementById('expYear').value);
    const today = new Date();
    const currentMonth = today.getMonth() + 1; 
    const currentYear = today.getFullYear();

    if (!expMonth || expMonth < 1 || expMonth > 12) {
        const li = document.createElement('li');
        li.textContent = 'Expiration month must be between 1 and 12.';
        errorList.appendChild(li);
        hasErrors = true;
    }

    if (!expYear || expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        const li = document.createElement('li');
        li.textContent = 'Expiration date must not be in the past.';
        errorList.appendChild(li);
        hasErrors = true;
    }

   
    if (hasErrors) {
        errorMessagesDiv.classList.remove('hidden');
        event.preventDefault();
    }
   // Add code here to validate the credit card and expiration date.
   // If any validation errors occur, call event.preventDefault() so the form doesn't submit.
   // Add any validation errors as a list item to errorList (defined above)
});
