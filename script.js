/* 
  Things to do differently:
  inputs should really be called inputFields
  Using a global variable to track the current
  position of the input field would have been
  significantly easier than looping through
  - May refactor later
*/

const inputs = document.querySelectorAll(".pin-field");
const loginForm = document.querySelector(".pin-area");
const buttons = document.querySelectorAll(".numpad-button");
const body = document.querySelector("body");
const logo = document.querySelector(".logo");
let cursorLocation = 0;
let pin = "";

const users = [
  {
    name: "tristan",
    code: "9999",
  },
  {
    name: "tyler",
    code: "2222",
  },
  {
    name: "scott",
    code: "1111",
  },
  {
    name: "dillon",
    code: "0000",
  },
];

/* ********************************** */
/* PIN Code Input Field Functionality */
/* ********************************** */

/* 1.) Event Listeners */
/* Initialize event listeners to switch focus to next input field */
inputs.forEach((input, key) => {
  input.addEventListener("click", function () {
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        inputs[i].focus();
        break;
      }
    }
  });
});

/* Initialize event listeners to backspace prior field */
inputs.forEach((input, key) => {
  input.addEventListener("keydown", function (event) {
    if (inputs[cursorLocation - 1] && event.key === "Backspace") {
      inputs[cursorLocation - 1].focus();
      inputs[cursorLocation - 1].value = "";
      if (cursorLocation !== 0) {
        cursorLocation--;
      }
    }
  });
});

/* Initialize event listeners to get values from input fields as a string, and reset the active field */
inputs.forEach((input, key) => {
  input.addEventListener("keyup", function (event) {
    if (input.value) {
      if (key === 3) {
        pin = getPinFromInputField(inputs);
        this.form.reset();
        inputs[0].focus();
        cursorLocation = 0;
        login(pin);
      } else {
        inputs[key + 1].focus();
        cursorLocation++;
      }
    }
  });
});

/* Event Listener for the on-screen numpad buttons */
// buttons.forEach((button, key) => {
//   button.addEventListener("click", function (event) {});
// });

/* Event Listeners for le buttons */
buttons.forEach((button, key) => {
  button.addEventListener("click", () => {
    inputs[cursorLocation].value = button.textContent;
    if (cursorLocation === 3) {
      pin = getPinFromInputField(inputs);
      login(pin);
      inputs[0].form.reset();
      inputs[0].focus();
      cursorLocation = 0;
    } else {
      cursorLocation++;
    }
  });
});

/* 2.) Functions */
const login = function (pin) {
  if (
    users.find((item) => {
      return pin === item.code;
    })
  )
    console.log("Logged in");
  else {
    console.log("No");
  }
};

const getPinFromInputField = (inputs) => {
  let pin = "";
  for (input of inputs) {
    pin = `${pin}${input.value}`;
  }
  return pin;
};
