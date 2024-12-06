const { safestFunction } = require("./script.cjs");

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

function exampleFunc(userDetails, numbers, data) {
  console.log("Function executed successfully");
  console.log("User Details:", userDetails);
  console.log("Numbers:", numbers);
  console.log("Data:", data);
}

safestFunction(types, args, exampleFunc, true);

try {
  safestFunction(types, args, exampleFunc, true);
} catch (error) {
  console.error("Caught an error:", error.message);
}
