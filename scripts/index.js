import Calculator from "./calculator.js";

const app = document.querySelector(".app");
const themeSwitcher = document.querySelector("#switcher");

const screen = document.querySelector(".calculator__screen--text");
const overheadScreen = screen.previousElementSibling;
const keyNumbers = document.querySelectorAll("#key__number");
const keyDelete = document.querySelector(".calculator__key--delete");
const keyReset = document.querySelector(".calculator__key--reset");
const keyDot = document.querySelector(".calculator__key--dot");
const keyOperations = document.querySelectorAll(".calculator__key--operator");
const keyEquals = document.querySelector(".calculator__key--equal");

const calculator = new Calculator(screen, overheadScreen);

keyNumbers.forEach(function (key) {
    key.addEventListener("click", () => {
        calculator.displayInScreen(key.textContent);
    });
});
keyReset.addEventListener("click", () => {
    calculator.clear();
});
keyDelete.addEventListener("click", () => {
    calculator.deleteNumber();
});
keyDot.addEventListener("click", () => {
    calculator.displayInScreen(keyDot.textContent);
});
keyOperations.forEach((key) => {
    key.addEventListener("click", () => {
        calculator.state = {
            ...calculator.state,
            firstNumber: parseFloat(screen.textContent),
            operator: key.textContent,
        };
        calculator.displayInTopScreen(
            `${calculator.state.firstNumber}${calculator.state.operator}`
        );
    });
});
keyEquals.addEventListener("click", () => {
    calculator.state = {
        ...calculator.state,
        secondNumber: parseFloat(screen.textContent),
    };
    calculator.calculate();
});

themeSwitcher.addEventListener("change", () => {
    let value = parseInt(themeSwitcher.value);
    switch (value) {
        case 1: {
            themeSwitcher.dataset.theme = "theme-one";
            changeTheme(themeSwitcher.dataset.theme);
            break;
        }
        case 2: {
            themeSwitcher.dataset.theme = "theme-two";
            changeTheme(themeSwitcher.dataset.theme);
            break;
        }
        default: {
            themeSwitcher.dataset.theme = "theme-three";
            changeTheme(themeSwitcher.dataset.theme);
        }
    }
});
function changeTheme(theme) {
    app.removeAttribute("class");
    app.classList.add("app");
    app.classList.add(theme);
}
