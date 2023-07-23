const { types } = require("util");

9999999999999999; // 16
// 100000000000000000

true + 2;
// 3

"21" + true;
// '21true'
"21" - -1;
// 22
0.1 + 0.2 === 0.3;
// false

3 > 2 > 1;
// false
3 > 2 >= 1;
// true

"B" + "a" + "a" + "a";
// BaNaNa

// -----------------------------

console.log(String(123) === "123", "explicit convertion to string");
console.log(123 + "" === "123", "implicit convertion to string");

console.assert(("hello" || 123) === "hello", "|| returns the first element!");
console.assert(("hello" && 123) === 123, "&& returns the last element!");

const item = {
  name: "wilerson",
  age: 33,
  // string: 1 se nao for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },

  // number: 1 se não for primitivo, chama o toString
  valueOf() {
    return 7;
  },

  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType);
    const type = {
      string: JSON.stringify(this),
      number: "7",
    };

    return types[coercionType] || types.string;
  },
};

// console.log("toString", String(item));
// vai retornar NaN pois o toString retornou a string
// console.log("valueOf", Number(item));

console.log("String", String(item));
console.log("Number", Number(item));
// chama a conversao default
console.log("Date", new Date(item));

console.log(item + 0 === `{"name":"wilerson","age":30}0`);
console.log(!!item);
console.assert("Ae".concat(item) === 'Ae{"name":"wilerson","age":30}');
const item2 = { ...item, name: "Zézin", age: 20 };
console.assert(item2.name === "Zézin" && item2.age === 30);
