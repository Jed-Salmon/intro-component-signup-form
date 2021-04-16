const form = document.getElementById("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const password = document.getElementById("password");

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const showError = (input, message) => {
  const icon = input.nextElementSibling;
  icon.className = "fas fa-exclamation-circle error";
  const field = input;
  field.className = "error";
  const formControl = input.parentElement.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

const showSuccess = (input) => {
  const icon = input.nextElementSibling;
  icon.className = "fas fa-exclamation-circle success";
  const formControl = input.parentElement.parentElement;
  formControl.className = "form-control success";
  const field = input;
  field.className = "success";
};

const checkRequired = (inputErr) => {
  inputErr.forEach((input) => {
    // trim removes whitespace
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less then ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const checkEmail = (input) => {
  const char = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (char.test(input.value.trim())) {
    //The test() method tests for a match in a string and returns true if it finds a match, otherwise false.
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // function calls
  checkRequired([fname, lname, email, password]);
  checkLength(fname, 3, 15);
  checkLength(lname, 3, 15);
  checkLength(password, 8, 25);
  checkEmail(email);
});
