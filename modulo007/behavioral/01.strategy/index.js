import PostgresStrategy from "./src/strategy/postgresStrategy.js";
import ContextStrategy from "./src/base/contextStrategy.js";
import MongodbStrategy from "./src/strategy/mongodbStrategy.js";

const postgresConnectionString =
  "postgres://wilerson:wil123@localhost:5432/heroes";
const postgresContext = new ContextStrategy(
  new PostgresStrategy(postgresConnectionString)
);
await postgresContext.connect();

const mongoDBconnectionString =
  "mongodb://wilerson:wil123@localhost:27017/heroes";
const mongoDBContext = new ContextStrategy(
  new MongodbStrategy(mongoDBconnectionString)
);
await mongoDBContext.connect();

const data = [
  { name: "wilerson", type: "transaction" },
  { name: "uatina", type: "activityLog" },
];

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
};

for (const { type, name } of data) {
  const context = contextTypes[type];
  await context.create({ name: name + Date.now() });

  console.log(type, context.constructor.name);
  console.log(await context.read());
}
