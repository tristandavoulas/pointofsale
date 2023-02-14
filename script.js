const inputs = document.querySelectorAll("input");
const loginForm = document.querySelector("form");
let pin = "";

const users = [
  {
    name: "tristan",
    code: 9999,
  },
  {
    name: "tyler",
    code: 2222,
  },
  {
    name: "scott",
    code: 1111,
  },
  {
    name: "dillon",
    code: 0000,
  },
];

console.log(inputs);

/* ********************************** */
/* PIN Code Input Field Functionality */
/* ********************************** */

/* 1.) Event Listeners */
/* Initialize event listeners to switch focus to next input field */
inputs.forEach((input, key) => {
  if (key !== 0) {
    input.addEventListener("click", function () {
      inputs[0].focus();
    });
  }
});

/* Initialize event listeners to get values from input fields as a string, and reset the field */
inputs.forEach((input, key) => {
  input.addEventListener("keyup", function () {
    if (input.value) {
      if (key === 3) {
        for (input of inputs) {
          pin = `${pin}${input.value}`;
        }
        this.form.reset();
        inputs[0].focus();
      } else {
        inputs[key + 1].focus();
      }
    }
  });
});

/* 2.) Functions */
console.log(users);

/* Code to */
