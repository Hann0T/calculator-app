const keyNumbers = document.querySelectorAll("#key__number");
const keyDelete = document.querySelector(".calculator__key--delete");
const keyReset = document.querySelector(".calculator__key--reset");
const screen = document.querySelector(".calculator__screen--text");

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
});
