const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");

//<poderia estar em outro arquivo>
const dbData = [{ name: "Joao" }, { name: "Lill" }];
class MockDatabase {
  connect = () => this;
  find = async (query) => dbData;
}
//<poderia estar em outro arquivo>

rewiremock(() => require("./../src/util/database")).with(MockDatabase);

(async () => {
  {
    const expected = [{ name: "JOAO" }, { name: "LILL" }];
    rewiremock.enable();
    const UserFactory = require("./../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }
  {
    const expected = [{ name: "WILERSON" }];

    const UserFactory = require("./../src/factory/userFactory");
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();
