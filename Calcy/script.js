document.addEventListener("DOMContentLoaded", () => {
    let input = document.querySelector("#display"); // Select input field
    let string = ""; // Stores the expression

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", (e) => {
            let buttonText = e.target.innerText;

            // Handle AC (Clear input)
            if (buttonText === "AC") {
                string = "";
                input.value = "0";
            }

            // Handle ± button (Toggle positive/negative)
            else if (buttonText === "±") {
                if (string !== "" && !isNaN(string)) {
                    string = (parseFloat(string) * -1).toString();
                }
                input.value = string || "0";
            }

            // Handle % (Convert to decimal)
            else if (buttonText === "%") {
                if (string !== "" && !isNaN(string)) {
                    string = (parseFloat(string) / 100).toString();
                }
                input.value = string || "0";
            }

            // Handle Operators (Replace ÷ with / and × with *)
            else if (buttonText === "÷") {
                if (string !== "" && !isOperator(string[string.length - 1])) {
                    string += "/";
                }
                input.value = string;
            }

            else if (buttonText === "×") {
                if (string !== "" && !isOperator(string[string.length - 1])) {
                    string += "*";
                }
                input.value = string;
            }

            // Handle "=" (Evaluate the expression safely)
            else if (buttonText === "=") {
                try {
                    if (string !== "") {
                        string = eval(string).toString(); // Evaluate expression
                        if (string === "Infinity" || string === "-Infinity") {
                            throw new Error("Cannot divide by zero");
                        }
                    }
                } catch (error) {
                    string = "";
                    input.value = "Error";
                    return;
                }
                input.value = string;
            }

            // Append numbers and dot (.)
            else {
                if (string === "0") string = ""; // Avoid leading zeros
                string += buttonText;
                input.value = string;
            }
        });
    });

    // Helper function to check if the last character is an operator
    function isOperator(char) {
        return ["+", "-", "*", "/"].includes(char);
    }
});
