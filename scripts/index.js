const app = document.querySelector(".app");
const themeSwitcher = document.querySelector("#switcher");
const keyNumbers = document.querySelectorAll("#key__number");
const keyOperations = document.querySelectorAll(".calculator__key--operator");
const keyDelete = document.querySelector(".calculator__key--delete");
const keyEquals = document.querySelector(".calculator__key--equal");
const keyReset = document.querySelector(".calculator__key--reset");
const keyDot = document.querySelector(".calculator__key--dot");
const screen = document.querySelector(".calculator__screen--text");
const overheadScreen = screen.previousElementSibling;

const screenValues = {
    prevValue: 0,
    nextValue: 0,
    operationToDo: "",
};

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

keyNumbers.forEach(function (key) {
    key.addEventListener("click", () => {
        if (parseInt(screen.textContent) === 0) {
            return (screen.textContent = key.firstChild.textContent);
        }
        screen.textContent += key.firstChild.textContent;
    });
});

keyDelete.addEventListener("click", () => {
    if (screen.textContent.length === 1) {
        return (screen.textContent = 0);
    }

    screen.textContent = screen.textContent.slice(0, -1);
});

keyReset.addEventListener("click", () => {
    screen.textContent = 0;
    overheadScreen.textContent = "";
});

keyDot.addEventListener("click", () => {
    screen.textContent += ".";
});

keyOperations.forEach((key) => {
    key.addEventListener("click", () => {
        screenValues.prevValue = parseFloat(screen.textContent);
        screenValues.operationToDo = key.dataset.operator;
        overheadScreen.textContent = `${screen.textContent}${key.dataset.operator}`;
        screen.textContent = 0;
    });
});

keyEquals.addEventListener("click", () => {
    screenValues.nextValue = parseFloat(screen.textContent);
    overheadScreen.textContent += screen.textContent + "=";
    let { prevValue, nextValue, operationToDo } = screenValues;
    const doTheOperation = matchOperator(operationToDo);
    screen.textContent = doTheOperation(prevValue, nextValue);
});

function matchOperator(operator) {
    switch (operator) {
        case "+": {
            return (a, b) => {
                return a + b;
            };
        }
        case "-": {
            return (a, b) => {
                return a - b;
            };
        }
        case "x": {
            return (a, b) => {
                return a * b;
            };
        }
        default: {
            return (a, b) => {
                return a / b;
            };
        }
    }
}

function changeTheme(theme) {
    app.removeAttribute("class");
    app.classList.add("app");
    app.classList.add(theme);
}
