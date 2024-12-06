/**
 * Checks if the value matches the specified type.
 *
 * @param {*} value - The value to be checked.
 * @param {string|Array|Object} type - The type or structure that the value should match. Can be a string, array, or object.
 * @returns {boolean} - Returns true if the value matches the type or structure, and false otherwise.
 */
function checkType(value, type) {
  // Check if the type is a string
  if (typeof type === "string") {
    return typeof value === type;
    // Check if the type is an array
  } else if (Array.isArray(type)) {
    if (!Array.isArray(value)) return false;
    return value.every((item) => checkType(item, type[0]));
    // Check if the type is an object
  } else if (typeof type === "object") {
    if (typeof value !== "object" || value === null) return false;
    return Object.keys(type).every((key) => checkType(value[key], type[key]));
  }
  return false;
}

/**
 * Safely executes a function, checking if the argument types match the specified types.
 *
 * @param {Array} types - An array of types or structures that the arguments should match.
 * @param {Array} args - An array of arguments to be passed to the function.
 * @param {Function} func - The function to be executed.
 * @param {boolean} [throwError=false] - If true, throws errors; otherwise, logs them to the console.
 * @returns {*} - Returns the result of the function execution or undefined if an error occurred.
 */
function safestFunction(types, args, func, throwError = false) {
  // Check if the number of types matches the number of arguments
  if (types.length !== args.length) {
    const errorMsg = "Invalid number of arguments";
    if (throwError) {
      throw new Error(errorMsg);
    } else {
      console.error(errorMsg);
      return;
    }
  }

  // Validate each argument against its corresponding type
  for (let i = 0; i < types.length; i++) {
    if (!checkType(args[i], types[i])) {
      const errorMsg = `Argument at position index: ${i}, value: ${args[i]} does not match the expected type or structure.`;
      if (throwError) {
        throw new Error(errorMsg);
      } else {
        console.error(errorMsg);
        return;
      }
    }
  }

  // Try to execute the function with the provided arguments
  try {
    return func(...args);
  } catch (e) {
    if (throwError) {
      throw e;
    } else {
      console.error(e.message ? e.message : e);
    }
  }
}

module.exports = { safestFunction, checkType };
