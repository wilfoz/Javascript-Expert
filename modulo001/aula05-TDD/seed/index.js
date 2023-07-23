const { faker } = require("@faker-js/faker");
const { writeFile } = require("fs/promises");
const { join } = require("path");

const Car = require("../src/entities/car");
const Costumer = require("../src/entities/costumer");
const CarCategory = require("../src/entities/carCategory");

const ITEMS_AMOUNT = 2;
const seederBaseFolder = join(__dirname, "../", "database");

const carCategory = new CarCategory({
  id: faker.string.uuid(),
  name: faker.vehicle.type(),
  carId: [],
  price: faker.finance.amount(20, 200),
});

const cars = [];
const costumers = [];
for (let index = 0; index <= ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.string.uuid(),
    name: faker.vehicle.vehicle(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });
  carCategory.carId.push(car.id);
  cars.push(car);

  const costumer = new Costumer({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.date.birthdate({ min: 18, max: 60 }),
  });
  costumers.push(costumer);
}

const write = (filename, data) =>
  writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

(async () => {
  await write("cars.json", cars);
  await write("carCategories.json", [carCategory]);
  await write("costumers.json", costumers);

  console.log(cars);
  console.log(carCategory);
  console.log(costumers);
})();
