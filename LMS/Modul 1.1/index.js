const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};


const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isPasswordContainSpecialCharacter = password => {
    const re = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return re.test(String(password));
}

const isPasswordContainUppercase = password => {
    const re = /[A-Z]+/;
    return re.test(String(password));
}

const isPasswordContainNumber = password => {
    const re = /[0-9]+/;
    return re.test(String(password));
}

const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    let isEmailValid = false;
    let isPasswordValid = false;

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
        isEmailValid = true;
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 6 ) {
        setError(password, 'Password must be at least 6 character.')
    } else if (!isPasswordContainSpecialCharacter(passwordValue)) {
        setError(password, 'Password must contain at least one special character.')
    } else if (!isPasswordContainUppercase(passwordValue)) {
        setError(password, 'Password must contain at least one uppercase letter.')
    } else if (!isPasswordContainNumber(passwordValue)) {
        setError(password, 'Password must contain at least one number.')
    }
    else {
        setSuccess(password);
        isPasswordValid = true;
    }

    if(isEmailValid && isPasswordValid) {
        alert('Login successful!')
    }
};