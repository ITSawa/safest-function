const { safestFunction, checkType } = require("../lib/script.cjs");

describe("checkType", () => {
  test("should correctly check primitive types", () => {
    expect(checkType(123, "number")).toBe(true);
    expect(checkType("abc", "string")).toBe(true);
    expect(checkType(true, "boolean")).toBe(true);
    expect(checkType(123, "string")).toBe(false);
    expect(checkType("abc", "number")).toBe(false);
  });

  test("should correctly check arrays of primitive types", () => {
    expect(checkType([1, 2, 3], ["number"])).toBe(true);
    expect(checkType(["a", "b", "c"], ["string"])).toBe(true);
    expect(checkType([1, "b", 3], ["number"])).toBe(false);
    expect(checkType([1, 2, 3], ["string"])).toBe(false);
  });

  test("should correctly check objects with nested structures", () => {
    const type = {
      user: {
        id: "number",
        profile: {
          name: "string",
          details: {
            hobbies: ["string"],
            address: {
              street: "string",
              city: "string",
              coordinates: {
                lat: "number",
                lng: "number",
              },
            },
          },
        },
      },
    };

    const validValue = {
      user: {
        id: 1,
        profile: {
          name: "John",
          details: {
            hobbies: ["reading", "gaming"],
            address: {
              street: "123 Main St",
              city: "Anytown",
              coordinates: {
                lat: 40.7128,
                lng: -74.006,
              },
            },
          },
        },
      },
    };

    const invalidValue = {
      user: {
        id: "1",
        profile: {
          name: "John",
          details: {
            hobbies: ["reading", 123],
            address: {
              street: "123 Main St",
              city: "Anytown",
              coordinates: {
                lat: "40.7128",
                lng: -74.006,
              },
            },
          },
        },
      },
    };

    expect(checkType(validValue, type)).toBe(true);
    expect(checkType(invalidValue, type)).toBe(false);
  });
});

describe("safestFunction", () => {
  const exampleFunc = jest.fn((userDetails, numbers, data) => {
    return "Function executed successfully";
  });

  test("should execute function with valid arguments", () => {
    const types = [
      {
        user: {
          id: "number",
          profile: {
            name: "string",
            details: {
              hobbies: ["string"],
              address: {
                street: "string",
                city: "string",
                coordinates: {
                  lat: "number",
                  lng: "number",
                },
              },
            },
          },
        },
      },
      ["number"],
      {
        data: {
          values: [
            {
              timestamp: "number",
              value: "number",
            },
          ],
        },
      },
    ];

    const args = [
      {
        user: {
          id: 1,
          profile: {
            name: "John",
            details: {
              hobbies: ["reading", "gaming"],
              address: {
                street: "123 Main St",
                city: "Anytown",
                coordinates: {
                  lat: 40.7128,
                  lng: -74.006,
                },
              },
            },
          },
        },
      },
      [42, 43, 44],
      {
        data: {
          values: [
            { timestamp: 1616161616, value: 100 },
            { timestamp: 1616161717, value: 110 },
          ],
        },
      },
    ];

    const result = safestFunction(types, args, exampleFunc, false);
    expect(result).toBe("Function executed successfully");
    expect(exampleFunc).toHaveBeenCalledWith(...args);
  });

  test("should log error for invalid number of arguments", () => {
    console.error = jest.fn();

    const types = [{ id: "number" }];
    const args = [];

    safestFunction(types, args, exampleFunc, false);
    expect(console.error).toHaveBeenCalledWith("Invalid number of arguments");
  });

  test("should throw error for invalid number of arguments", () => {
    const types = [{ id: "number" }];
    const args = [];

    expect(() => safestFunction(types, args, exampleFunc, true)).toThrow(
      "Invalid number of arguments"
    );
  });

  test("should log error for invalid argument types", () => {
    console.error = jest.fn();

    const types = [{ id: "number" }];
    const args = [{ id: "not a number" }];

    safestFunction(types, args, exampleFunc, false);
    expect(console.error).toHaveBeenCalledWith(
      "Argument at position index: 0, value: [object Object] does not match the expected type or structure."
    );
  });

  test("should throw error for invalid argument types", () => {
    const types = [{ id: "number" }];
    const args = [{ id: "not a number" }];

    expect(() => safestFunction(types, args, exampleFunc, true)).toThrow(
      "Argument at position index: 0, value: [object Object] does not match the expected type or structure."
    );
  });

  test("should log error if function execution throws an error", () => {
    console.error = jest.fn();
    const throwingFunc = () => {
      throw new Error("Test error");
    };

    const types = ["number"];
    const args = [42];

    safestFunction(types, args, throwingFunc, false);
    expect(console.error).toHaveBeenCalledWith("Test error");
  });

  test("should throw error if function execution throws an error", () => {
    const throwingFunc = () => {
      throw new Error("Test error");
    };

    const types = ["number"];
    const args = [42];

    expect(() => safestFunction(types, args, throwingFunc, true)).toThrow(
      "Test error"
    );
  });
});
