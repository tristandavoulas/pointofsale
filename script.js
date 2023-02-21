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

class employee {
  constructor(_name, _pin, _birthday, _hideDate, _position) {
    this.name = _name;
    this.pin = _pin;
    this.birthday = `_birthday`;
    this.hireDate = `_hideDate`;
    this.position = "_position";
    this.payrate = 0;
    this.payrateBonus = 0;
  }
}

let employees = fetch("employees.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (obj) {
    employees = obj;
  });

/* ********************************** */
/* Miscellaneous Event Listeners */
/* ********************************** */
logo.addEventListener("animationend", () => {
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
const login = function (enteredPin) {
  if (
    employees.find((item) => {
      return enteredPin === item.pin;
    })
  ) {
    loggedIn();
    return true;
  }
  return false;
};

const loggedIn = () => {
  const employee = employees.find((item) => {
    return pin === item.pin;
  });
  console.log(`Logged in as: ${employee.name}`);
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
/* Initialize variables to store data on each type of menu item, and each menu item */

class menuCategory {
  constructor(_name) {
    this.name = _name;
    this.items = {};
  }

  createMenuItem(_name, _type) {
    const item = new menuItem(_name, _type);
    if (this.items[_name]) {
      console.log("Menu item already exists, doing nothing");
      return;
    }
    this.items[_name] = item;
    console.log(`New menu item (${_name}) created`);
  }

  /* This function returns an array containing each menu item variables name as a string */
  getMenuItemsStrings() {
    const names = [];
    for (let name in this.items) {
      names.push(name);
    }
    return names;
  }
}

class menuItem {
  constructor(_name, _type) {
    this.name = _name;
    this.type = _type;
    this.ingredients = {};

    if (this.type === "food") {
      this.ingredients.meat = [];
      this.ingredients.veg = [];
      this.ingredients.dairy = [];
      this.ingredients.seasoning = [];
      this.modifiers = [];
    }
  }

  addMeat(meatToAdd) {
    this.ingredients.meat.push(`${meatToAdd}`);
  }

  addIngredient(_name, _type) {
    this.ingredients[_type].push(`${_name}`);
  }
}

let menuCategories = [];
const pizzas = new menuCategory("Pizzas");
const appetizers = new menuCategory("Appetizers");
const sandwiches = new menuCategory("Sandwiches");
const pasta = new menuCategory("Pasta");
const soupsnsalads = new menuCategory("Soups & Salads");
const burgsnfavs = new menuCategory("Burgers & House Favorites");
const kidsMenu = new menuCategory("Kids Menu");
const drinks = new menuCategory("Beverages");
const beer = new menuCategory("Beer");
const wine = new menuCategory("Wine");

/* Initialize menu items */

const pizzasOld = {
  categoryName: "Pizza",
  item: {
    petesCombo: {
      displayName: `Pete's Combo`,
      ingredients: {
        meat: [
          "pepperoni",
          "sausage linguica",
          "italian sausage",
          "salami",
          "ham",
        ],
        veg: ["bell peppers", "olives black", "artichoke hearts"],
        dairy: ["mozzarella"],
        seasoning: [],
      },
    },
    petesItalianGarlic: {
      displayName: `Pete's Italian Garlic`,
      ingredients: {
        meat: ["sausage linguica", "sausage italian"],
        veg: ["mushrooms", "tomatoes", "onions green"],
        dairy: ["mozzarella"],
        seasoning: ["italian herbs"],
      },
    },
    petesChickenCombo: {
      displayName: `Pete's Chicken Combo`,
      ingredients: {
        meat: ["chicken breast", "bacon"],
        veg: ["onions red artichoke"],
        dairy: ["mozzarella"],
        seasoning: ["italian herbs"],
      },
    },
    petesAllMeat: {
      displayName: `Pete's All-Meat`,
      ingredients: {
        meat: ["pepperoni", "salami", "ham"],
        veg: ["onions red artichoke"],
        dairy: ["mozzarella"],
        seasoning: ["italian herbs"],
      },
    },
  },
};

const categories = [
  pizzas,
  appetizers,
  sandwiches,
  pasta,
  soupsnsalads,
  burgsnfavs,
  kidsMenu,
  drinks,
  beer,
  wine,
];

/* A "Category" Contains data on each menu item, it's ingredients, and a string containing it's display name
to be used when creating HTML buttons */
class Category {
  constructor() {
    this.categoryName = ``;
  }
}

/* Initialize Category Button HTML Elements */
for (let categoryElement of categories) {
  const categoryHTML = document.createElement("div");
  categoryHTML.classList.add("button");
  categoryHTML.innerHTML = `<span class='button-text'>${categoryElement.name}</span>`;
  categoriesHTML.appendChild(categoryHTML);
}

/* Event Listeners for Category buttons to show Items when clicked on */
for (let categoryElement of categoriesHTML.children) {
  categoryElement.addEventListener("click", () => {
    items.innerHTML = "";
    createButtonFromDisplayName(categoryElement, categories);
    // for (let category of categories) {
    //   if (categoryElement.textContent === category.categoryName) {
    //     for (let propertyName in category.item) {
    //       console.log(`${pizzas.item[propertyName].displayName}`);
    //     }
    //   }
    // }
  });
}

// for (const property in pizzas.item) {
//   console.log(pizzas.item[property].displayName);
// }

function createButtonFromDisplayName(element, categoriesArr) {
  for (let category of categoriesArr) {
    if (element.textContent === category.categoryName) {
      for (let propertyName in category.item) {
        const displayName = `${category.item[propertyName].displayName}`;
        const newButton = document.createElement("div");
        newButton.classList.add("button");
        newButton.innerHTML = `<span class="button-text">${displayName}</span>`;
        items.appendChild(newButton);
      }
    }
  }
}
