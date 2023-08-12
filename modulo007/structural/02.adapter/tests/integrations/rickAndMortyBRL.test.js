import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import fs from "fs/promises";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL.js";
import Character from "../../src/entities/characters.js";
import axios from "axios";

describe("#RickAndMortyBRL", () => {
  beforeEach(() => jest.clearAllMocks());
  test("#getCharactersJSON should return a list of character Entity", async () => {
    const response = JSON.parse(
      await fs.readFile("./tests/mocks/characters.json")
    );
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const expected = response.results.map((char) => new Character(char));

    const result = await RickAndMortyBRL.getCharactersFromJson();
    expect(result).toStrictEqual(expected);
  });
  test("#getCharactersJSON should return an empty list if the API returns nothing", async () => {
    const response = JSON.parse(
      await fs.readFile("./tests/mocks/characters-empty.json")
    );
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const expected = response.results;

    const result = await RickAndMortyBRL.getCharactersFromJson();
    expect(result).toStrictEqual(expected);
  });
});
