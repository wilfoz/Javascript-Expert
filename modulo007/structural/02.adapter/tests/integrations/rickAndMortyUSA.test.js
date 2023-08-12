import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import fs from "fs/promises";
import RickAndMortyUSA from "../../src/business/integrations/rickAndMortyUSA.js";
import Character from "../../src/entities/characters.js";
import axios from "axios";

describe("#RickAndMortyUSA", () => {
  beforeEach(() => jest.clearAllMocks());
  test("#getCharactersXML should return a list of character Entity", async () => {
    const response = await fs.readFile("./tests/mocks/characters.xml");
    const expected = [
      {
        gender: undefined,
        id: NaN,
        location: undefined,
        name: undefined,
        origin: undefined,
        species: undefined,
        status: undefined,
        type: undefined,
      },
    ];

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyUSA.getCharactersFromXml();
    expect(result).toMatchObject(expected);
  });
  test("#getCharactersJSON should return an empty list if the API returns nothing", async () => {
    const response = await fs.readFile("./tests/mocks/characters-empty.xml");
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const expected = [];

    const result = await RickAndMortyUSA.getCharactersFromXml();
    expect(result).toStrictEqual(expected);
  });
});
