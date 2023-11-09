import { useState } from "react";
import { evaluate } from "mathjs";

const App = () => {
const [answer, setAnswer] = useState("");
const [expression, setExpression] = useState("0");
const [lastPressed, setLastPressed] = useState(null);

const replaceLastOperator = (currentExpression, newOperator) => {
const regex = /([*/+-]\s\*)$/;

    if (regex.test(currentExpression)) {
      return currentExpression.replace(regex, `${newOperator} `);
    }

    return `${currentExpression} ${newOperator} `;

};

const isOperator = (symbol) => {
return /[*/+-]/.test(symbol);
};

const touch = (symbol) => {
if (symbol === "clear") {
setAnswer("");
setExpression("0");
setLastPressed(null);
} else if (symbol === "negative") {
if (isOperator(lastPressed) && expression !== "0") {
setExpression((prev) => `${prev} -`);
} else {
if (expression.slice(-2) === "- ") {
setExpression((prev) => prev.slice(0, -2));
} else {
const parts = expression.split(" ");
const lastNumber = parts.pop();
const newLastNumber =
lastNumber.charAt(0) === "-"
? lastNumber.slice(1)
: `-${lastNumber}`;
setExpression([...parts, newLastNumber].join(" "));
}
}
} else if (symbol === "percent") {
setExpression((prev) => (parseFloat(prev) / 100).toString());
} else if (isOperator(symbol)) {
if (
isOperator(lastPressed) &&
lastPressed !== "\_" &&
expression !== "0"
) {
setExpression((prev) => replaceLastOperator(prev, symbol));
} else {
setExpression((prev) => (prev === "0" ? symbol : `${prev} ${symbol} `));
}
} else if (symbol === "=") {
calculate();
} else if (symbol === "0") {
if (expression !== "0") {
setExpression((prev) => prev + symbol);
}
} else if (symbol === ".") {
const lastNumber = expression.split(/[\s*/+-]+/).pop();
if (lastNumber && !lastNumber.includes(".")) {
setExpression((prev) => prev + symbol);
}
} else {
setExpression((prev) => (prev === "0" ? symbol : prev + symbol));
}
setLastPressed(symbol);
};

const calculate = () => {
try {
const result = evaluate(expression);
setAnswer(result.toString());
setExpression(result.toString());
} catch (error) {
console.error(error);
setAnswer("Error");
}
};

return (
<div className="calc-container">
<h1>FCC calcul</h1>
<div id="calculator">
<div className="display" id="display">
{answer || expression}
</div>
<button id="add" className="spe" onClick={() => touch("+")}> +
</button>
<button id="subtract" className="spe" onClick={() => touch("-")}> -
</button>
<button id="multiply" className="spe" onClick={() => touch("\*")}>
X
</button>
<button id="divide" className="spe" onClick={() => touch("/")}>
/
</button>
<button id="zero" onClick={() => touch("0")}>
0
</button>
<button id="one" onClick={() => touch("1")}>
1
</button>
<button id="two" onClick={() => touch("2")}>
2
</button>
<button id="three" onClick={() => touch("3")}>
3
</button>
<button id="four" onClick={() => touch("4")}>
4
</button>
<button id="five" onClick={() => touch("5")}>
5
</button>
<button id="six" onClick={() => touch("6")}>
6
</button>
<button id="seven" onClick={() => touch("7")}>
7
</button>
<button id="eight" onClick={() => touch("8")}>
8
</button>
<button id="nine" onClick={() => touch("9")}>
9
</button>
<button id="decimal" className="spe" onClick={() => touch(".")}>
.
</button>
<button id="negative" className="spe" onClick={() => touch("_")}>
_
</button>
<button id="equals" className="spe" onClick={() => touch("=")}>
=
</button>
<button id="clear" className="spe" onClick={() => touch("clear")}>
AC
</button>
</div>
</div>
);
};

export default App;
