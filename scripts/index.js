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
        screenValues.operationToDo = key.textContent.toLowerCase();
        overheadScreen.textContent = `${screen.textContent}${key.textContent}`;
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
        case "/": {
            return (a, b) => {
                return a / b;
            };
        }
    }
}
