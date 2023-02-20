/* 
  Things to do differently:
  inputs should really be called inputFields
  Using a global variable to track the current
  position of the input field would have been
  significantly easier than looping through
  Write function to add multiple classes to an HTML Element in one line
  - May refactor later
*/

const inputs = document.querySelectorAll(".pin-field");
const loginForm = document.querySelector(".pin-area");
const buttons = document.querySelectorAll(".numpad-button");
const numpad = document.querySelector(".login-box");
const body = document.querySelector("body");
const logo = document.querySelector(".logo");
const appBody = document.querySelector(".app-body");
const categoriesHTML = document.querySelector(".categories");
const items = document.querySelector(".items");
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

// appBody.classList.toggle("hidden");
/* ********************************** */
/* Miscellaneous Event Listeners */
/* ********************************** */
logo.addEventListener("animationend", () => {
  console.log("Animation end");
  appBody.classList.toggle("hidden");
});

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

/* Initialize event listener to backspace prior field */
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

/* Initialize event listener to get values from input fields as a string, and reset the active field */
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
  ) {
    console.log("Logged in");
    loggedIn();
    return true;
  }
  return false;
};

const loggedIn = () => {
  console.log(numpad);
  numpad.classList.toggle("hidden");
  logo.classList.toggle("show");
};

const getPinFromInputField = (inputs) => {
  let pin = "";
  for (input of inputs) {
    pin = `${pin}${input.value}`;
  }
  return pin;
};

/* ****************************** */

const pizzas = {
  categoryName: "Pizza",
  item: {
    petesCombo: {
      displayName: `Pete's Combo`,
      ingredientsMeat: [
        "pepperoni",
        "sausage linguica",
        "italian sausage",
        "salami",
        "ham",
      ],
      ingredientsVegs: ["bell peppers", "olives black", "artichoke hearts"],
      ingredientsCheese: [],
      ingredientsDairy: [],
    },
  },
};

const appetizers = {
  categoryName: "Appetizers",
};

const sandwiches = {
  categoryName: "Sandwiches",
};

const pasta = {
  categoryName: "Pasta",
};

const saladSoup = {
  categoryName: "Salad & Soup",
};

const burgsnfavs = {
  categoryName: "Burgers & House Favorites",
};

const kidsMenu = {
  categoryName: "Kids Menu",
};

const drinks = {
  categoryName: "Beverages",
};

const beer = {
  categoryName: "Beer",
};

const wine = {
  categoryName: "Wine",
};

const categories = [
  pizzas,
  appetizers,
  sandwiches,
  pasta,
  saladSoup,
  burgsnfavs,
  kidsMenu,
  drinks,
  beer,
  wine,
];
console.log(categories);

/* Initialize Category Button HTML Elements */
for (category of categories) {
  const categoryHTML = document.createElement("div");
  categoryHTML.classList.add("button");
  categoryHTML.innerHTML = `<span class='button-text'>${category.categoryName}</span>`;
  categoriesHTML.appendChild(categoryHTML);
}

/* Event Listeners for Category buttons to show Items when clicked on */
for (category of categoriesHTML.children) {
  category.addEventListener("click", () => {
    const ingredientHTML = document.createElement("div");
    ingredientHTML.classList.add("button");
    ingredientHTML.innerHTML = `<span class='button-text'>Test</span>`;
    items.appendChild(ingredientHTML);
  });
}
