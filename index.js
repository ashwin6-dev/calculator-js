function getTokens(calculation) {
    var tokens = []
    var currentToken = ""
    var operators = ["+", "-", "/", "*", "^", "(", ")"]

    for (var i = 0; i < calculation.length; i++) {
        currentToken += calculation[i]

        if (operators.indexOf(currentToken) > -1) {
            if (currentToken != "-") {
                tokens.push(currentToken)
                currentToken = ""
            }else if (!isNaN(tokens[tokens.length - 1]) || tokens[tokens.length - 1] == ")") {
                tokens.push(currentToken)
                currentToken = ""
            }
        }else if (!isNaN(currentToken) && isNaN(currentToken + calculation[i+1])) {
            tokens.push(Number(currentToken))
            currentToken = ""
        }
    }

    return tokens
}

function infixToPostfix(tokens) {
    var stack = []
    var result = []
    var rank = {
        "^": 3,
        "*": 2,
        "/": 2,
        "+": 1,
        "-": 1
    }
    var ops = Object.keys(rank)
    for (var t of tokens) {
        if (t == "(") {
            stack.push(t)
        }else if (ops.indexOf(t) > -1) {
            while (rank[stack[stack.length - 1]] >= rank[t]) {
                result.push(stack.pop())
            }

            stack.push(t)
        }else if (t == ")") {
            while (stack.length != 0 && stack[stack.length - 1] != "(") {
                result.push(stack.pop())
            }
            stack.pop()
        }else {
            result.push(t)
        }
    }

    result = [...result, ...stack]

    return result
}

function evaluate(expr) {
    var tokens = getTokens("("+expr+")")
    var postfix = infixToPostfix(tokens)
    var stack = []

    for (var token of postfix) {
        if (!isNaN(token)) {
            stack.push(token)
        }else {
            var rhs = stack.pop()
            var lhs = stack.pop()

            if (token == "+") {
                stack.push(lhs + rhs)
            }else if (token == "-") {
                stack.push(lhs - rhs)
            }else if (token == "*") {
                stack.push(lhs * rhs)
            }else if (token == "^") {
                stack.push(lhs ** rhs)
            }else if (token == "/") {
                stack.push(lhs / rhs)
            }
        }
    }

    return stack[0]
}

console.log(evaluate("(10+5)*4"))
console.log(evaluate("(11/5)*((8-2)+(6^2))"))