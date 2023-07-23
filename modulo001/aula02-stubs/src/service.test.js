const Service = require("./service");
const assert = require("assert");
const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";
const { createSandbox } = require("sinon");
const sinon = createSandbox();
const mocks = {
  alderan: require("../mocks/alderan.json"),
  tatooine: require("../mocks/tatooine.json"),
};

(async () => {
  // {
  //   const service = new Service();
  //   const dados = await service.makeRequest(BASE_URL_2);
  //   console.log("dados:", JSON.stringify(dados));
  // }
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);
  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
  stub.withArgs(BASE_URL_2).resolves(mocks.alderan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      films: 5,
    };
    const result = await service.getPlanets(BASE_URL_1);
    assert.deepStrictEqual(result, expected);
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      films: 2,
    };
    const result = await service.getPlanets(BASE_URL_2);
    assert.deepStrictEqual(result, expected);
  }
})();
