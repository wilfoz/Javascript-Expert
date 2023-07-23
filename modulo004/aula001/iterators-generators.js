const assert = require("assert");

function* calculation(num1, num2) {
  yield num1 + num2;
}

function* main() {
  yield "Hello";
  yield "-";
  yield "World";
  yield* calculation(10, 20);
}

const generator = main();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

assert.deepStrictEqual(generator.next(), { value: "Hello", done: false });
assert.deepStrictEqual(generator.next(), { value: "-", done: false });
assert.deepStrictEqual(generator.next(), { value: "World", done: false });
assert.deepStrictEqual(generator.next(), { value: 30, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ["Hello", "-", "World", 30]);
assert.deepStrictEqual([...main()], ["Hello", "-", "World", 30]);

// ---- async iterators

const { readFile, stat, readdir } = require("fs/promises");

function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve("Hey dude");
}

// (Promise.all([...promisified()]).then((data) => console.log(data));

// (async () => {
//   for await (const item of promisified()) {
//     console.log("for await", item.toString());
//   }
// })();

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() };

  const { size } = await stat(__filename);
  yield { size };

  const dir = await readdir(__dirname);
  yield { dir };
}

(async () => {
  for await (const item of systemInfo()) {
    console.log("systemInfo", item);
  }
})();
