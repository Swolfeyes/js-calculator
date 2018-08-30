let currentButtonValue = "";
let currentButtonType = "";
let total = "";
let calculationHistory = "";

let operations = {
  operand1: "",
  operand2: "",
  operator: ""
}

const buttons = document.querySelectorAll(".calculator__pad__item");
const displayCurrentNumber = document.querySelector(".calculator__display__current-number span");
const displayHistory =  document.querySelector(".calculator__display__history span");

displayCurrentNumber.innerText = "0";

const calculateTotal = () => {

  let op1 = parseFloat(operations.operand1);
  let op2 = parseFloat(operations.operand2);

  if (operations.operand2 === "") {
    return;
  }
    switch(operations.operator) {
      case "+":
        total = op1 + op2;
        break;
      case "-":
        total = op1 - op2;
        break;
      case "x":
        total = op1 * op2;
        break;
      case "/":
        total = op1 / op2;
        break;
    }
    operations.operand2 = "";
    operations.operator = "";
    operations.operand1 = total;

    if(total.toString().length > 14) {
        return total.toExponential(8);
    }
    return total;
}

const clearCalculation = () => {
  operations.operand1 = "";
  operations.operand2 = "";
  operations.operator = "";
  calculationHistory = "";
  displayHistory.innerText = "";
}

// Event Handlers
const handleNumberClick = () => {

  if(operations.operator === "") {
   if(operations.operand1.length <=10) {
     operations.operand1 += currentButtonValue;
     calculationHistory += currentButtonValue;
     displayCurrentNumber.innerText = operations.operand1;
     displayHistory.innerText = calculationHistory;
   }
  } else {
    if(operations.operand2.length <= 10) {
      operations.operand2 += currentButtonValue;
      calculationHistory += currentButtonValue;
      displayCurrentNumber.innerText = operations.operand2;
      displayHistory.innerText = calculationHistory;
    }
  }
};

const handleOperationClick = () => {

  if(operations.operand1 !== "" && operations.operand2 !== "" ){
    calculateTotal();
  }

  if(operations.operand1 === parseFloat(total)) {
    calculateTotal();
  }

  operations.operator = currentButtonValue;
  calculationHistory += currentButtonValue;
  displayCurrentNumber.innerText = operations.operator;
  displayHistory.innerText = calculationHistory;
};

const handleFunctionClick = () => {

  if (currentButtonValue === "=" && operations.operator !== "") {
    console.log(operations.operator);
    displayCurrentNumber.innerText = calculateTotal();
  }
  if (currentButtonValue === "AC") {
    clearCalculation();
    displayCurrentNumber.innerText = "0";
  }
};

const handleButtonItemClick = function() {
  const { type } = this.dataset;
  const value = this.innerText;

  if(operations.operand1 === "" && operations.operand2 === "" && type === "operation") {
    return;
  }

  if(currentButtonValue === "." && value === ".") {
    return;
  }

  if(currentButtonType === "operation" && type === "operation") {
    calculationHistory = calculationHistory.slice(0, -1) + value;
    operations.operator = value;
    displayCurrentNumber.innerText = operations.operator;
    displayHistory.innerText = calculationHistory;
    return;
  }

  if (currentButtonType === "function" && type === "num") {
    clearCalculation();
    displayCurrentNumber.innerText = "";
  }
  currentButtonType = type;
  currentButtonValue = value;

  switch (type) {
    case "num": handleNumberClick(); break;
    case "function": handleFunctionClick(); break;
    case "operation": handleOperationClick(); break;
    default: break;
  }
};

// Events
buttons.forEach((buttonItem) => {
  buttonItem.addEventListener("click", handleButtonItemClick);
});
