/* Global Variables ==================================================================== */
// constants
const isLogging = false;

// DOM
const formWaitlistMain = document.querySelector('#formWaitlistMain');
const buttonSubmitEmail = document.querySelector('.buttonSubmit');
const inputTextEmail = document.querySelector('.inputText');
const errorEmail = document.querySelector('.errorEmail');

/* Utilities ==================================================================== */
const hideElement = elem => elem.classList.add('inactive');
const showElement = elem => elem.classList.remove('inactive');

/* Email Submission ==================================================================== */
// is input an email?
const checkIfInputIsEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isEmail = re.test(String(input).toLowerCase());
  return isEmail;
};

// email error generator
const makeError = (msg) => {
  errorEmail.textContent = msg;
  showElement(errorEmail);
};

// email validation listener
buttonSubmitEmail.addEventListener('click', (e) => {
  e.preventDefault();

  const input = inputTextEmail.value;
  const isEmail = checkIfInputIsEmail(input);
  if (!isEmail) {
    makeError('You must enter a valid email.');
  } else {
    hideElement(errorEmail);
    formWaitlistMain.submit();
  }
});

/* Tracking ==================================================================== */
// facebook
if (isLogging) fbq('track', 'PageView');

buttonSubmitEmail.addEventListener('click', () => {
  if (isLogging) fbq('track', 'CompleteRegistration');
});
