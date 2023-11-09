import { useState } from "react";

const touch = [
  { id: "zero", value: 0 },
  { id: "one", value: 1 },

  { id: "two", value: 2 },
  { id: "divide", value: "/" },
  { id: "three", value: 3 },

  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "multiply", value: "*" },

  { id: "six", value: 6 },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "subtract", value: "-" },

  { id: "nine", value: 9 },

  { id: "add", value: "+" },
  { id: "equals", value: "=" },
  { id: "decimal", value: "." },
  { id: "clear", value: "AC" },
];

const App = () => {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (button) => {
    return /[*/+-]/.test(button);
  };

  const onButtonPressed = (button) => {
    if (button === "AC") {
      setAnswer("");
      setExpression("0");
    } else if (isOperator(button)) {
      setExpression(et + " " + button + " ");
    } else if (button === "=") {
      if (!expression) return;
      calculate();
    } else if (button === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + button);
      }
    } else if (button === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;

      if (lastNumber?.includes(".")) return;
      setExpression(expression + button);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + button);
      } else {
        setExpression(expression + button);
      }
    }
  };

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;

    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;

        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }

    const newExpression = newParts.join(" ");

    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression).toString());
    } else {
      setAnswer(eval(newExpression).toString());
    }

    setExpression("");
  };

  return (
    <div id="calculator-container">
      <h1>La calculatrice</h1>
      <div id="calculator">
        <div id="display">
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>
        <div id="calculator">
          {touch.map((touch) => {
            return (
              <button
                key={touch.id}
                id={touch.id}
                onClick={() => onButtonPressed(touch.value.toString())}
              >
                {touch.value}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
