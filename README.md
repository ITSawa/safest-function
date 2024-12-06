# Safest Function

A JavaScript library for safely executing functions with type-checked arguments. This library ensures that the arguments passed to a function match the expected types or structures, reducing runtime errors and improving reliability.

## Features

- **Type Checking**: Validates function arguments to ensure they match the specified types or structures.
- **Flexible Type Support**: Supports primitive types (e.g., `string`, `number`), arrays, and objects.
- **Safe Function Execution**: Executes functions only if argument types are valid, with options for error handling.
- **Customizable Error Handling**: Choose whether errors should be thrown or logged to the console.

## Installation

### Using npm

```bash
npm install safest-function

Usage
checkType(value, type)
Checks if the value matches the specified type.

Parameters:
value: The value to be checked (any JavaScript data type).
type: The expected type or structure (string, array, or object).
Returns:
true if the value matches the type.
false if the value does not match the type.
Example:
javascript

import { checkType } from "safest-function";

console.log(checkType("Hello", "string"));  // true
console.log(checkType(123, "string"));      // false
console.log(checkType([1, 2, 3], ["number"]));  // true
console.log(checkType({ id: 1, name: "John" }, { id: "number", name: "string" }));  // true
safestFunction(types, args, func, throwError = false)
Safely executes a function after validating that the argument types match the specified types.

Parameters:
types: An array of types or structures that the arguments should match.
args: An array of arguments to be passed to the function.
func: The function to execute.
throwError (optional): If true, errors are thrown; otherwise, they are logged to the console (default: false).
Returns:
The result of the function execution, or undefined if an error occurred.
Example:
javascript

import { safestFunction } from "safest-function";

// Define the expected types
const types = [
  { user: { id: "number", profile: { name: "string" } } }, // Object with a user
  ["number"],  // Array of numbers
];

// Define the arguments to pass
const args = [
  { user: { id: 1, profile: { name: "John" } } },  // First argument: Object
  [42, 43],  // Second argument: Array of numbers
];

// Define the function to execute
function exampleFunc(userDetails, numbers) {
  console.log("User Details:", userDetails);
  console.log("Numbers:", numbers);
}

// Usage without throwing errors
safestFunction(types, args, exampleFunc, false);

// Usage with throwing errors
try {
  safestFunction(types, args, exampleFunc, true);
} catch (error) {
  console.error("Caught an error:", error.message);
}
Error Handling
You can customize how errors are handled when the argument types do not match the expected types:

Log Errors to Console: By default, errors are logged to the console.
Throw Errors: Set throwError to true in safestFunction to throw errors when arguments do not match the expected types.
Example:
javascript

try {
  safestFunction(types, args, exampleFunc, true);  // Throws an error
} catch (error) {
  console.error(error.message);  // Caught an error
}
License
This library is released under the MIT License.

Contributing
We welcome contributions! Please feel free to submit issues and pull requests.

How to contribute:
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a pull request.
Authors
ITSawa Savva - Initial work - ITSawa
Acknowledgments
Thanks to all the contributors and the open-source community!
vbnet


### Key Improvements:

- **Markdown Structure**: Structured for readability with clear sections like "Features", "Installation", and "Usage".
- **Code Blocks**: Example code is provided in clear, syntax-highlighted code blocks.
- **Detailed Descriptions**: Explanations for parameters and return values to guide users in understanding how to use the library.
- **Contributing Section**: A section for contributing, which is common for open-source projects on GitHub.

This format is optimized for displaying well on GitHub and in JavaScript files, providing a professional and clean presentation of your library's documentation.







```
