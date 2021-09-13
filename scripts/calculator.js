export default class Calculator {
  constructor(screen, topScreen) {
    this.screen = screen;
    this.topScreen = topScreen;
    this.state = {
      firstNumber: 0,
      secondNumber: 0,
      operator: "",
    };
  }
  displayInScreen(value) {
    if (!value) {
      return;
    }
    if (value === ".") {
      if (this.screen.textContent.includes(".")) {
        return;
      }
      return (this.screen.textContent += value);
    }
    if (this.screen.textContent === "0") {
      return (this.screen.textContent = value);
    }
    this.screen.textContent += value;
  }
  displayInTopScreen(value) {
    this.topScreen.textContent = value;
    this.screen.textContent = 0;
  }
  clear() {
    this.screen.textContent = 0;
    this.topScreen.textContent = "";
    this.state = {};
  }
  deleteNumber() {
    if (this.screen.textContent.length === 1) {
      return this.clear();
    }
    this.screen.textContent = this.screen.textContent.slice(0, -1);
  }
  calculate() {
    let operation = this.matchOperator(this.state.operator);
    let result = operation(this.state.firstNumber, this.state.secondNumber);
    this.clear();
    this.displayInScreen(result);
  }
  matchOperator(operator) {
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
}
