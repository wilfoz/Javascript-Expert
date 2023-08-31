// import CartIdNew from "./cart-id-new.js";
// import CartIdOld from "./cart-id-old.js";
// import CartPropNew from "./cart-rm-prop-new.js";
// import CartPropOld from "./cart-rm-prop-old.js";
import database from "../database.js";
import CartPriceOld from "./cart-price-old.js";
import CartPriceNew from "./cart-price-new.js";

import Benchmark from "benchmark";

const suite = new Benchmark.Suite();

// suite
//   .add("Cart#cartIdUUID", function () {
//     new CartIdOld();
//   })
//   .add("Cart#cartIdCrypto", function () {
//     new CartIdNew();
//   })
//   .on("cycle", (event) => console.log(String(event.target)))
//   .on("complete", function () {
//     console.log(`fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run();

// const data = {
//   products: [
//     {
//       id: "ae",
//       name: undefined,
//       lastName: undefined,
//       age: null,
//       some: 123,
//     },
//     {
//       id: "ae",
//       name: undefined,
//       lastName: undefined,
//       age: null,
//       some: 123,
//     },
//   ],
// };
// suite
//   .add("Cart#rmEmptyPropsMapReduce", function () {
//     new CartPropOld(data);
//   })
//   .add("Cart#rmEmptyPropsFor", function () {
//     new CartPropNew(data);
//   })
//   .on("cycle", (event) => console.log(String(event.target)))
//   .on("complete", function () {
//     console.log(`fastest is ${this.filter("fastest").map("name")}`);
//   })
//   .run({ async: true });

suite
  .add("Cart#calcPriceMapReduce", function () {
    new CartPriceOld(database);
  })
  .add("Cart#calcPriceFor", function () {
    new CartPriceNew(database);
  })
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", function () {
    console.log(`fastest is ${this.filter("fastest").map("name")}`);
  })
  .run({ async: true });
