const transactionTypes = [
  { id: 1, name: "Cash", value: "sales-cash", operation: "+" },
  { id: 2, name: "Card", value: "sales-card", operation: "+" },
  { id: 3, name: "Bill", value: "bill", operation: "-" },
  { id: 4, name: "Wage", value: "wage", operation: "-" },
  { id: 5, name: "Lost", value: "lost", operation: "-" },
  { id: 6, name: "Misc", value: "misc", operation: "-" },
];

module.exports = transactionTypes;
